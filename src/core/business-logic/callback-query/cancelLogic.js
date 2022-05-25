const { bot } = require('../../../bot');
const { Schedule, User } = require('../../../database/models');
const { getConnection } = require('../../../database')
const options = require('../../../options/index');
const { sendNotification } = require('../sendNotification');
const { date } = require('../../../shared');


/**
 * 
 * @param {{
 * chatId: number,
 * userId: number,
 * msgData: string,
 * }} option
 * @param option.userId - default is income_message.from.id,
 * @param option.chatId - default is income_message.message.chat.id,
 * @param option.msgData - default is income_message.data,
 * @returns 
 */
const cancelLogic = async ({ chatId, userId, msgData, messageId }) => {
  // Datetime of booking to cancel
  const datetime = Number(`${msgData}`.match(new RegExp(/(?<=\/cancel>).[\d]+/gi)))
  // console.log('Unix time: ', datetime)
  // console.log('U day: ', new Date(datetime))

  await getConnection()
  const user = await User.findOne({ id: userId })
  
  if (!user || !user.car_plate) {
    return bot.sendMessage(chatId, `You wasn't authorized or you don't have assigned car plate. Write: /start`)
  }

  if(!datetime) {
    // Show all reservations (bookings) if exists
    const bookings = await Schedule.find({ id: userId }).sort({ datetime: 1 })
    if (!bookings || !bookings.length)
      return bot.sendMessage(chatId, 'У вас немає активних бронювань.')
    
    bookings.map((el) => {
      const text = `${date.formatShortDateWithTime(el.datetime)}`
      // console.log(`${el.datetime} ${text} ${el.user_fullname} ${el.car_plate}`)
    })

    return bot.sendMessage(chatId, `Виберіть бронювання яке бажаєте відмінити`, options.generate.bookingsByDbData(bookings))
  } 

  const bookToCancel = await Schedule.findOne({ datetime })
  if (!bookToCancel) {
    return bot.sendMessage(chatId, 'Це бронювання уже скасоване.').then(() => {
      // if (messageId) bot.deleteMessage(chatId, messageId)
    })
  }

  await Schedule.findOneAndDelete({ datetime })

  // new Date(newBook.datetime).toLocaleString("es-CL")
  const savedDateUTC = `${date.formatFullDate(datetime, true, '.')}`

  return bot.deleteMessage(chatId, messageId).then(() => {
    bot.sendMessage(chatId, `You just canceled\t${savedDateUTC}`).then( async () => await sendNotification({ bookedDay: datetime, wasCancelled: true }))
  })
}

module.exports = { cancelLogic }
