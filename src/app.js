const CONFIG = require('./config')
const languagePack = require('./language');

const { genereteSchedule } = require('./const')

const { User, Plate, Schedule } = require('./database/models');
const { writeLogInDb } = require('./database');

const businessLogic = require('./core');

const { bot } = require('./bot')
const defaultLanguage = 'UA'
const CAR_PLATES = require('../mockDataPlates')
console.log('Hey')
console.log(CAR_PLATES.length)

const { paginate, date, message } = require('./shared')
 
const Text = require('./language')

const plateRegExp = new RegExp(/^\/plates [0-9]/)
const platesPrefix = '/plates '

const choseDayRegExp = new RegExp(/(?<=\/week>)[\d]+/)
const choseDayPrefix = '/week> '

const choosedPlateRegExp = new RegExp(/(?<=\/plate )[\d]+/)

const { getConnection, requestWrapper } = require('./database/database');

const genereteButton = (text, callback_data) => {
  return { text, callback_data }
}

const paginationSize = 9;

const options = require('./options/index');


bot.onText(/^\/book>[\d]+/g, (msg) => {
  const currentDate = new Date()

  console.log(' BOOKING PRocess')

  bot.sendMessage(msg.chat.id, 'Choose day', options.generate.chooseExactDay(0))
})

bot.onText(/^✅(\W)+/g, async (msg) => {
  await getConnection()
  const user = await User.findOne({ id: msg.from.id })

  if (!user) {
    return bot.sendMessage(msg.chat.id, `Wrong sequesnce! You are not authorized. Write: /start`)
  }

  let plateString = undefined

  if(
    user.car_plate !== undefined
    && user.car_plate !== null
    && String(user.car_plate).length
  ) {
    plateString = String(user.car_plate).padStart(4, '0')
  }

  const responceMsg = message.generate.bookFirstMessage({ plateString })

  bot.sendMessage(msg.chat.id, `${responceMsg}`, options.generate.firstBooking({ plateString }))
})

// Cancell reservation
bot.onText(/^❎(\W)+/g, async (msg) => {
  await businessLogic.callback_query.cancelLogic({
    chatId: msg.chat.id,
    userId: msg.from.id,
    msgData: '/cancel>',
  })
})

const createMatrix = (dataArr, maxRows, maxColumns) => {
  if (dataArr && dataArr.length) {
    const main = []
    let i = 0;

    for (let index = 0; index < dataArr.length; index++){
      if (!main[i]) main[i] = []
      main[i].push(dataArr[index])
      if ( (index+1) % maxRows === 0 ) i++;
    }

    return main;
  }
}



bot.setMyCommands([
  { command: '/start', description: 'Description of Command 1' },
  { command: '/add_plate', description: 'Add plate' },
  { command: '/info', description: 'Info' },
])

//Main Script
bot.onText(/\/start/, async (msg) => {
  try {
    await getConnection()

    const user = msg.from
    const existed = await User.findOne({ id: user.id })
    if (!existed) 
      new User({
        id: user.id,
        first_name: user.first_name || '',
        last_name: user.last_name || '',
        username: user.username,
        language_code: user.language_code
      }).save()
    
    bot.sendMessage(msg.chat.id, languagePack[`UA`].GREETING, options.generate.startOptions());
  } catch (err) {
    console.log('Error on /start. Error: ',err)
    writeLogInDb('Error on /start', 'Error: ' + err, true)
  }
});


bot.onText(/\/change_car_plate/gi, async (msg) => {
    try {
    await getConnection()

    const user = msg.from
    console.log(user)
    const existed = await User.findOne({ id: user.id })
    if (!existed) 
      new User({
        id: user.id,
        first_name: user.first_name || '',
        last_name: user.last_name || '',
        username: user.username,
        language_code: user.language_code
      }).save()
    
    console.log('If existed', !!existed.car_plate, existed.car_plate)
    // If no car_palte => Choose your car plate 

    console.log('🔵🟡 1-')
    console.log(msg)
    console.log(process.env.TELEGRAM_CHANNEL)

    // console.log('Connection:')
    // console.log(db)

    // bot.sendMessage(process.env.TELEGRAM_CHANNEL, 'Hallow ma friend');
    bot.sendMessage(msg.chat.id, `Find your car plate`, options.default.selectCarPlatesTemplate);
  } catch (err) {
    console.log(' ')
    console.log(err)
    writeLogInDb('Error on /start', 'Error: ' + err, true)
    console.log(' - - ')
  }
})

bot.on('callback_query', async (cmd) => {
  const deleteMsg = new RegExp(/\/deleteMsg/gi).test(cmd.data)
  const changeCarPlate = new RegExp(/\/change_car_plate/gi).test(cmd.data)
  
  const isChoosingPlate = plateRegExp.test(cmd.data)
  const isChoosingDay = choseDayRegExp.test(cmd.data)
  const choosedPlate = choosedPlateRegExp.test(cmd.data)

  const isBooking = new RegExp(/(?<=\/book>)[\d]+/g).test(cmd.data)
  const isCanceling = new RegExp(/^\/cancel>/g).test(cmd.data)

  if(deleteMsg) {
    return bot.deleteMessage(cmd.message.chat.id, cmd.message.message_id)
  }

  if (changeCarPlate) {
    bot.deleteMessage(cmd.message.chat.id, cmd.message.message_id)
    return bot.sendMessage(cmd.message.chat.id, `Find your car plate`, options.default.selectCarPlatesTemplate);
  }

  console.log(`ON callback_query: '${cmd.data}'`)
  console.log(' isChoosingPlate ', isChoosingPlate)
  console.log(' isChoosingDay ', isChoosingDay)
  console.log(' choosedPlate ', choosedPlate)
  console.log(' ')

  // On Plate template
  if (isChoosingPlate) {
    await businessLogic.callback_query.choosingPlate({
      chatId: cmd.message.chat.id,
      msgData: cmd.data,
      messageId: cmd.message.message_id,
    })
  }

  if (choosedPlate) {
    await getConnection()
    const plate = Number(`${cmd.data}`.match(new RegExp(/(?<=\/plate )[\d]+/gi)))

    if (!plate) return bot.sendMessage(cmd.message.chat.id, 'Wrong plate')

    const user = await User.findOne({ id: cmd.from.id })

    if (!user) 
      return bot.sendMessage(cmd.message.chat.id, `Wrong sequesnce! You are not authorized. Write: /start`, options.se)

    await User.findOneAndUpdate({ id: cmd.from.id }, { car_plate: plate })
    bot.deleteMessage(cmd.message.chat.id, cmd.message.message_id)
    bot.sendMessage(cmd.message.chat.id, `Your car plate is: ${String(plate).padStart(4,'0')}`)
  }

  if (isChoosingDay) {
    await businessLogic.callback_query.choosingDayLogic({
      chatId: cmd.message.chat.id,
      userId: cmd.from.id,
      msgData: cmd.data,
      messageId: cmd.message.message_id,
    })
  }

  if (isBooking) {
    await businessLogic.callback_query.bookingLogic({
      chatId: cmd.message.chat.id,
      userId: cmd.from.id,
      msgData: cmd.data,
    })
  }

  if (isCanceling) {
    await businessLogic.callback_query.cancelLogic({
      chatId: cmd.message.chat.id,
      userId: cmd.from.id,
      msgData: cmd.data,
      messageId: cmd.message.message_id,
    })
  }

  if (plateRegExp.test(cmd.message.text)) { console.log(' BBB ')}

})

bot.onText(/\/add_plate/, async (msg) => {
  await businessLogic.addPlatelogic({
    chatId: msg.chat.id,
    userId: msg.from.id,
    msgData: msg.data,
  })
})

// Grant Super rights | Admin rights
bot.onText(new RegExp(`${CONFIG.SUPERUSER_TOKEN}`), async (msg) => {
  try {
    const userId = msg.from.id
    let message = `Can't get user ID`
    if (userId) {
      await getConnection()
      const res = await User.findOneAndUpdate({ id: userId }, { is_admin: true })
      message = res ? 'You granted super rights!' : 'Something went wrong!'
    }
    bot.sendMessage(msg.chat.id, message)
  } catch (err) {
    console.log(err)
    writeLogInDb('Error on /SUPERUSER_TOKEN', 'Error: ' + err, true)
  }
})

bot.on("polling_error", (err) => {
  console.log('On polling_error: ')
  console.log(err)
} )

module.exports = { bot }
