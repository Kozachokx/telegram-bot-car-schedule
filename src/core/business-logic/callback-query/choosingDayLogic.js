const { bot } = require('../../../bot');
const { getConnection } = require('../../../database');
const { Schedule } = require('../../../database/models');
const { genereteSchedule } = require('../../../const')
const { date, message } = require('../../../shared')
const options = require('../../../options/index')

  // /week>2>3    /week>week>day | if day - request data
  // const isChoosingDay = choseDayRegExp.test(cmd.data)
  // let isChoosingDay = '/week 0' 
const choosingDayLogic = async ({ chatId, userId, msgData, messageId }) => {
  const [ week, day ] = `${msgData}`.match(new RegExp(/(?<=>)[\d]+/gi)).map(el => Number(el))
  console.log(' week ', week, ' | day ', day)

  if (day) {
    await getConnection()

    console.log('Show day ', day)
    let msgToDelete = await bot.sendMessage(chatId, 'Перевіряю місця. Будь ласка зачекайте...').then((msgDelete) => msgDelete.message_id)

    const startOfChoosedDay = date.getUTCTimeByCurrentWeekDay(day)

    console.log(startOfChoosedDay)

    const dataFromDb = await Schedule.find({})
      .where('datetime')
      .gte(startOfChoosedDay)
      .lt(date.getUTCTimeByCurrentWeekDay(day, true))
      .sort({ datetime: 1 })

    const openToServe = genereteSchedule()
    dataFromDb.map(day => {
      const key = `${String(new Date(day.datetime).getUTCHours()).padStart(2, '0')}:${String(new Date(day.datetime).getUTCMinutes()).padStart(2, '0')}`
      console.log('key: ', key, `\t datetime: ${day.datetime}`)
      delete openToServe[`${key}`]
    })

    const generateHourSelectOptions = {}
    console.log(' BEFORE IF ')
    console.log(!Object.keys(openToServe).length)

    if (!Object.keys(openToServe).length) {
      bot.deleteMessage(chatId, msgToDelete)
      bot.sendMessage(chatId, 'No reservation avaliable') // No avaliable & BACK button 
    } else {
      console.log(' ELSE ')
      // Configure select buttons 

      // const options = generateSelectHourReservation( Object.keys(openToServe)  )
      Object.keys(openToServe)

      const weekDayText = `${message.generate.getDayOfTheWeek(new Date(startOfChoosedDay).getUTCDay())} (${date.formatMonthDateByDate(new Date(startOfChoosedDay))})`

      const opt = options.generate.selectDay(Object.keys(openToServe), startOfChoosedDay, msgData)
      return bot.deleteMessage(chatId, messageId).then(() => {
        bot.deleteMessage(chatId, msgToDelete)
        bot.sendMessage(chatId, `${weekDayText}`, opt)
      })
    }
  } else {
    bot.deleteMessage(chatId, messageId).then(() => {
      bot.sendMessage(chatId, 'Choose day', options.generate.chooseExactDay(week))
    })
  }
}

module.exports = { choosingDayLogic }
