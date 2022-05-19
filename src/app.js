const CONFIG = require('./config')

const { genereteSchedule } = require('./const')

const { User, Plate, Schedule } = require('./database/models');
const { writeLogInDb } = require('./database');


const { bot } = require('./bot')
const defaultLanguage = 'UA'
const CAR_PLATES = require('../mockDataPlates')
console.log('Hey')
console.log(CAR_PLATES.length)

const { paginate } = require('./shared')
 
const Text = require('./language')

const plateRegExp = new RegExp(/^\/plates [0-9]/)
const platesPrefix = '/plates '

const choseDayRegExp = new RegExp(/(?<=\/week>)[\d]+/)
const choseDayPrefix = '/week> '


const { getConnection, requestWrapper } = require('./database/database');
const { date } = require('./shared');

const genereteButton = (text, callback_data) => {
  return { text, callback_data }
}

const paginationSize = 9;

const options = require('./options');

// function getPagination( current, maxpage ) {
//   var keys = [];
//   if (current>1) keys.push({ text: `«1`, callback_data: '1' });
//   if (current>2) keys.push({ text: `‹${current-1}`, callback_data: (current-1).toString() });
//   keys.push({ text: `-${current}-`, callback_data: current.toString() });
//   if (current<maxpage-1) keys.push({ text: `${current+1}›`, callback_data: (current+1).toString() })
//   if (current<maxpage) keys.push({ text: `${maxpage}»`, callback_data: maxpage.toString() });

//   return {
//     reply_markup: JSON.stringify({
//       inline_keyboard: [ keys ]
//     })
//   };
// }

bot.onText(/^\/book>[\d]+/g, (msg) => {
  const currentDate = new Date()

  console.log(' BOOKING PRocess')

  // bot.sendMessage(msg.chat.id, `${currentDate}`)

  bot.sendMessage(msg.chat.id, 'Choose day',options.genereteChooseDayOptions(0))
})

bot.onText(/^✅(\W)+/g, (msg) => {
  const currentDate = new Date()

  // console.log(x)

  // bot.sendMessage(msg.chat.id, `${currentDate}`)

  bot.sendMessage(msg.chat.id, 'Choose day',options.genereteChooseDayOptions(0))
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

const timeRegExp = new RegExp(/[\d]+/g)

const generateSelectDayOption = (platesArray, unixDay, backCommand) => {
  const hourButtonsInLine = 2
  const buttons = []
  const back = backCommand.match(new RegExp(/^\/week>[\d]+/))

  const choosedDay = new Date(unixDay * 1000)

  platesArray.map(timeString => {
    const [ hour, minute ] = timeString.match(timeRegExp)
    const unix = new Date(unixDay).setUTCHours(Number(hour) | 0, Number(minute) | 0)
    buttons.push({ text: `${timeString}`, callback_data: `/book>${unix}` })
  })

  return {
    reply_markup: JSON.stringify({
      inline_keyboard: [...createMatrix(buttons, hourButtonsInLine), [{ text: 'Back', callback_data: `${back}` }]]
    })
  }
} 

const generatePlatesOptionByDBData = (platesArray, page) => {
  const platesButtonsInLine = 3
  const buttons = platesArray.slice(0, platesArray.length-1).map(plate => genereteButton(plate, `/plate ${plate}`))
  const additional = []

  if (page > 1) {
    // then Previous button
    additional.push({text: 'Previous page', callback_data: `/plates ${String(platesArray[0])[0]}>${page-1}`})
  }
  if (platesArray.length > paginationSize) {
    // then Next button
    additional.push({text: 'Next page', callback_data: `/plates ${String(platesArray[0])[0]}>${page+1}`})
  }

  return {
    reply_markup: JSON.stringify({
      inline_keyboard: [...createMatrix(buttons, platesButtonsInLine), additional]
    })
  }
} 

const generatePlatesOption = (platesArray, page) => {
  const buttons = paginate(platesArray, paginationSize, page).map(plate => genereteButton(plate, `/plate ${plate}`))
  const additional = []

  if (page > 1) {
    // then Previous button
    additional.push({text: 'Previous page', callback_data: `/${String(platesArray[0])[0]}>${page-1}`})
  }
  if (platesArray.length > page*paginationSize) {
    // then Next button
    additional.push({text: 'Next page', callback_data: `/${String(platesArray[0])[0]}>${page+1}`})
  }

  return {
    reply_markup: JSON.stringify({
      inline_keyboard: [...createMatrix(buttons, 3), additional]
    })
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
    
    bot.sendMessage(msg.chat.id, `Hello`, options.startOptions);
  } catch (err) {
    console.log(' ')
    console.log(err)
    writeLogInDb('Error on /start', 'Error: ' + err, true)
    console.log(' - - ')
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
    bot.sendMessage(msg.chat.id, `Find your car plate`, options.selectCarPlatesOption);
  } catch (err) {
    console.log(' ')
    console.log(err)
    writeLogInDb('Error on /start', 'Error: ' + err, true)
    console.log(' - - ')
  }
})

bot.on('callback_query', async (cmd) => {

  const isChoosingPlate = plateRegExp.test(cmd.data)
  const isChoosingDay = choseDayRegExp.test(cmd.data)

  const isBooking = new RegExp(/(?<=\/book>)[\d]+/g).test(cmd.data)

  console.log(`ON callback_query: '${cmd.data}'`)
  console.log(' IF ', isChoosingPlate)
  console.log(' isChoosingDay ', isChoosingDay)
  console.log(` isChoosingDay '${isChoosingDay}'`)
  console.log(' ')

    
  // On Plate template
  if (isChoosingPlate) {
    console.log(`🔵🟡  🔵🟡`)
    console.log(`${cmd.data}`)
    await getConnection()

    const currentPage = Number(`${cmd.data}`.match(new RegExp(/(?<=\/[0-9]>).*/gi))) || 1

    // First plate number 0xxx  => 0 | 1000
    const plateStartNumber = parseInt(cmd.data[platesPrefix.length])
    console.log('Choosed: ', plateStartNumber)

    let msgToDelete = await bot.sendMessage(cmd.message.chat.id, 'Please wait. Reciving data from database...')
      .then((msgDelete) => msgDelete.message_id)

    let allBy = await Plate.find({})
      .where('car_plate')
      .gte(plateStartNumber*1000)
      .lt((plateStartNumber+1)*1000)
      .sort({ car_plate: 1 })
      .skip((currentPage-1)*paginationSize)
      .limit(paginationSize+1)

    allBy = allBy.map(el => el.car_plate)

    console.log(` ${plateStartNumber*1000} <= x > ${(plateStartNumber+1)*1000} `)
    console.log(' ')
    console.log(' Allby')
    console.log(allBy)
    console.log(' ')

    // const allBy = CAR_PLATES.filter(number => number >= plateStartNumber*1000-1 && number < (plateStartNumber+1)*1000 )
    //   .sort((a,b) => a-b)
    
    if (allBy[0] < 1000) allBy.forEach((num, i) =>  allBy[i] = String(num).padStart(4,'0'))

    // POSSIBLE NO PLATES
    bot.deleteMessage(cmd.message.chat.id, cmd.message.message_id)
    bot.deleteMessage(cmd.message.chat.id, msgToDelete)

    bot.sendMessage(cmd.message.chat.id, `${plateStartNumber}xxx`, generatePlatesOptionByDBData(allBy, currentPage));
  }

  // /week>2>3    /week>week>day | if day - request data
  // const isChoosingDay = choseDayRegExp.test(cmd.data)
  // let isChoosingDay = '/week 0' 
  // console.log(' isChoosingDay ', isChoosingDay)
  if (isChoosingDay) {
    // const choosedWeek = Number(`${cmd.data}`.match(new RegExp(/(?<=\/week>)[\d]+/gi))) || 0
    const [ week, day ] = `${cmd.data}`.match(new RegExp(/(?<=>)[\d]+/gi)).map(el => Number(el))

    console.log(' week ', week, ' | day ', day)
    if (day) {
      await getConnection()

      console.log('Show day ', day)
      let msgToDelete = await bot.sendMessage(cmd.message.chat.id, 'Перевіряю місця. Будь ласка зачекайте...').then((msgDelete) => msgDelete.message_id)

      const startOfChoosedDay = date.getUnixTimeByFromCurrentWeek(day)
      const dayy = new Date(startOfChoosedDay*1000)

      console.log(' >>> ', dayy)

      const dataFromDb = await Schedule.find({})
        .where('datetime')
        .gte(startOfChoosedDay)
        .lt(date.getUnixTimeByFromCurrentWeek(day, true))
        .sort({ date_unix: 1 })

      const openToServe = genereteSchedule()
      dataFromDb.map(day => {
        const key = `${new Date(day.date_unix * 1000).getHours()}:${new Date(day.date_unix * 1000).getMinutes()}`
        console.log('key: ', key)
        delete openToServe[`${key}`]
      })

      const generateHourSelectOptions = {}
      console.log(' BEFORE IF ')
      console.log(!Object.keys(openToServe).length)

      if (!Object.keys(openToServe).length) {
        bot.deleteMessage(cmd.message.chat.id, msgToDelete)
        bot.sendMessage(cmd.message.chat.id, 'No reservation avaliable') // No avaliable & BACK button 
      } else {
        console.log(' ELSE ')
        // Configure select buttons 

        // const options = generateSelectHourReservation( Object.keys(openToServe)  )
        Object.keys(openToServe)

        const opt = generateSelectDayOption(Object.keys(openToServe), startOfChoosedDay, cmd.data)
        return bot.deleteMessage(cmd.message.chat.id, cmd.message.message_id).then(() => {
          bot.deleteMessage(cmd.message.chat.id, msgToDelete)
          bot.sendMessage(cmd.message.chat.id, 'Choose hour', opt)
        })
      }
    } else {

      // const option = options.genereteChooseDayOptions(choosedWeek)
  
      // console.log(cmd)
  
      bot.deleteMessage(cmd.message.chat.id, cmd.message.message_id).then(() => {
        bot.sendMessage(cmd.message.chat.id, 'Choose day',options.genereteChooseDayOptions(week))
      })
    }
  }


  if (isBooking) {
    console.log(' Booking process')
    const user = cmd.from
    console.log(user)
    const datetime = Number(`${cmd.data}`.match(new RegExp(/(?<=\/book>).*/gi)))
    console.log(datetime)

    console.log('Unix time: ', datetime)
    console.log('U day: ', new Date(datetime))
    console.log('U day: ', new Date(new Date(0).setUTCMilliseconds(datetime)))
    console.log('Reserved day: ', new Date(datetime*1000))
    console.log('Reserved day +3: ', new Date(datetime*1000 + 3*3600*1000))

    await getConnection()
    const booked = await Schedule.findOne({ datetime })
    if (booked) {
      return bot.sendMessage(cmd.message.chat.id, 'Вибачте, ця бронь уже зайнята.')
    }

    const newBook = new Schedule({
      id: user.id,
      datetime: datetime,
      user_fullname: `${user.first_name} ${user.last_name | ''}`,
      car_plate: 2546,
    })
    
  }

  // RegExp  >choose_hour 7
  // let isChoosingWeekDay = false
  // if (isChoosingWeekDay) {
  //   // /choose_day 


  //   // RegExp  >choose_day 7

  //   // 1 2    8 9
  //   // 3 4    10 11
  //   // 5 6    12 13
  //   // +7  -7  | nextWeek PreviousWeek
  // }

  if (plateRegExp.test(cmd.message.text)) { console.log(' BBB ')}

})

bot.onText(/\/add_plate/, async (msg) => {
  await getConnection()
  const user = await User.findOne({ id: user.id })

  if(user.is_admin) {
    bot.sendMessage(msg.chat.id, 'Write car plate number').then(
      (msgRes) => {
        bot.once('message', async (ms) => {
          try {
            const plate =  Number.isNaN(Number(ms.text)) ? null : parseInt(ms.text)
            if (plate === null || plate < 0 || plate > 9999) {
              return bot.sendMessage(ms.chat.id, `Wrong car plate number: '${ms.text}'`)
            }
            
            // if (!plate) return bot.sendMessage(ms.chat.id, `Wrong car plate number: '${ms.text}'`
            await getConnection()
  
            const exists = await Plate.findOne({ car_plate: plate })
            console.log(' Hey it: ', !!exists)
            if (exists) {
              return bot.sendMessage(ms.chat.id, 'Car plate already exists in DB')
            }
  
            const newPlate = new Plate({ car_plate: plate })
            // await newPlate.validate()
            await newPlate.save().then(() => {
              const number = plate < 1000 ? String(plate).padStart(4,'0') : plate
              bot.sendMessage(msgRes.chat.id, `Car plate '${number}' successfully saved.`)
            })
          } catch (err) {
            console.log('Error happend! Error: ', err)
          }
        })
      }
    )
  } else {
    bot.sendMessage(msg.chat.id, 'Access denied!')
  }
})

// bot.onText(/\/add_plate/, async (msg) => {
//   console.log('🔵🟡 2-')
//   console.log(msg)

//   bot.sendMessage(process.env.TELEGRAM_CHANNEL, 'Hallow ma friend');
//   bot.sendMessage(msg.chat.id, `Find your car plate`, options.selectCarPlatesOption);
// });


// Grant Super rights | Admin rights
bot.onText(new RegExp(`${CONFIG.SUPERUSER_TOKEN}`), async (msg) => {
  try {
    const userId = msg.from.id
    let message = `Can't get user ID`
    if (userId) {
      await getConnection()
      await User.findOneAndUpdate({ id: userId }, { is_admin: true })
      message = 'You granted super rights!';
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
