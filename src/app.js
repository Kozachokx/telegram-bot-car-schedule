// const CONFIG = require('./config')

const { User, Plate, Schedule } = require('./database/models');


const { bot } = require('./bot')
const defaultLanguage = 'UA'
const CAR_PLATES = require('../mockDataPlates')

const { paginate } = require('./shared')
 
const Text = require('./language')
console.log('Hey')
console.log(CAR_PLATES.length)

const plateRegExp = new RegExp(/^\/[0-9]/gi)

const { getConnection } = require('./database/database');

const genereteButton = (text, callback_data) => {
  return { text, callback_data }
}

// syncModels()

const paginationSize = 3;

const options = require('./options')

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

const createMatrix = (dataArr, maxRows, maxColumns) => {
  if (dataArr && dataArr.length) {
    const main = []
    let i = 0;

    for (let index = 0; index < dataArr.length; index++){
      if (!main[i]) main[i] = []
      main[i].push(dataArr[index])
      if ( (index+1) % maxRows === 0 ) i++;
    }

    // dataArr.map((el, index) => {
    //   if (!main[i]) main[i] = []
    //   main[i].push(el)
    //   if ( (index+1) % maxRows === 0 ) i++;
    // })

    return main;
  }

}


// const selectCarPlatesOption = {
//   reply_markup: JSON.stringify({
//     inline_keyboard: [
//       [{text: '0xxx', callback_data: '/0'}, {text: '1xxx', callback_data: '/1'}],
//       [{text: '2xxx', callback_data: '/2'}, {text: '3xxx', callback_data: '/3'}],
//       [{text: '4xxx', callback_data: '/4'}, {text: '5xxx', callback_data: '/5'}],
//       [{text: '6xxx', callback_data: '/6'}, {text: '7xxx', callback_data: '/7'}],
//       [{text: '8xxx', callback_data: '/8'}, {text: '9xxx', callback_data: '/9'}]
//     ]
//   })
// }

const generatePlatesOptionByDBData = (platesArray, page) => {
  const buttons = paginate(platesArray, paginationSize, page).map(plate => genereteButton(plate, `/plate ${plate}`))
  const additional = []

  if (platesArray.length > page*paginationSize) {
    // then Next button
    additional.push({text: 'Next page', callback_data: `/${String(platesArray[0])[0]}>${page+1}`})
  }
  if (page > 1) {
    // then Previous button
    additional.push({text: 'Previous page', callback_data: `/${String(platesArray[0])[0]}>${page-1}`})
  }

  return {
    reply_markup: JSON.stringify({
      inline_keyboard: [...createMatrix(buttons, 3), additional]
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

  console.log( ' NEXT BTN: ', `/${String(platesArray[0])[0]}>${page+1}`)

  return {
    reply_markup: JSON.stringify({
      inline_keyboard: [...createMatrix(buttons, 3), additional]
    })
  }
} 

//Main Script
bot.onText(/\/start/, async (msg) => {
  console.log('🔵🟡 1-')
  console.log(msg)
  console.log(process.env.TELEGRAM_CHANNEL)

  await getConnection()
  // console.log('Connection:')
  // console.log(db)

  bot.sendMessage(process.env.TELEGRAM_CHANNEL, 'Hallow ma friend');
  bot.sendMessage(msg.chat.id, `Find your car plate`, options.selectCarPlatesOption);
});

bot.setMyCommands([
  { command: '/start', description: 'Description of Command 1' },
  { command: '/add_plate', description: 'Add plate' },
  { command: '/info', description: 'Info' },
])


bot.on('callback_query', async (cmd) => {
  console.log(cmd)
    
  // On Plate template
  if (plateRegExp.test(cmd.data)) {
    const currentPage = `${cmd.data}`.match(new RegExp(/(?<=\/[0-9]>).*/gi)) || 1

    // First plate number 0xxx  => 0 | 1000
    const plateStartNumber = parseInt(cmd.data[1])
    console.log('Choosed: ', plateStartNumber)

    // const carPlates = await Plate.find({  }, {}, {skip: currentPage*paginationSize, limit: paginationSize+1})

    let allBy = await Plate.find({})
      .where('car_plate')
      .gte(plateStartNumber*1000)
      .lt((plateStartNumber+1)*1000)
      .sort({ car_plate: 1 })
      .skip((currentPage-1)*paginationSize)
      .limit(paginationSize+1)
      // .distinct('car_plate')
      // .select('-_id -__v')

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

    bot.sendMessage(cmd.message.chat.id, `${plateStartNumber}xxx`, generatePlatesOption(allBy, currentPage));
  }

  if (plateRegExp.test(cmd.message.text)) { console.log(' BBB ')}

})

bot.onText(/\/add_plate/, (msg) => {
  console.log(msg)
  bot.sendMessage(msg.chat.id, 'Write car plate number').then(
    (msgRes) => {
      console.log(msgRes)
      bot.once('message', async (ms) => {
        const plate =  Number.isNaN(Number(ms.text)) ? null : parseInt(ms.text)
        if (plate === null || plate < 0 || plate > 9999) {
          return bot.sendMessage(ms.chat.id, `Wrong car plate number: '${ms.text}'`)
        }
        
        // if (!plate) return bot.sendMessage(ms.chat.id, `Wrong car plate number: '${ms.text}'`)

        await getConnection()

        const exists = await Plate.findOne({ car_plate: plate })
        if (exists) {
          return bot.sendMessage(ms.chat.id, 'Car plate already exists in DB')
        }

        const newPlate = new Plate({ car_plate: plate })
        // await newPlate.validate()
        await newPlate.save()
      })
    }
  )
})

// bot.onText(/\/add_plate/, async (msg) => {
//   console.log('🔵🟡 2-')
//   console.log(msg)


//   bot.sendMessage(process.env.TELEGRAM_CHANNEL, 'Hallow ma friend');
//   bot.sendMessage(msg.chat.id, `Find your car plate`, options.selectCarPlatesOption);
// });

const callback = async (cb, args) => {
  console.log('🔵🟡 10')

  console.log(' - - - - -- ')
  console.log(args)
  await cb(args);
}

bot.on("polling_error", console.log)

module.exports = { bot }
