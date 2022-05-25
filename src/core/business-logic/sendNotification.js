const { bot } = require('../../bot');
const { Schedule } = require('../../database/models');
const { getConnection } = require('../../database')
const { date, message } = require('../../shared')
const defaultChannelId = process.env.TELEGRAM_CHANNEL

/**
 * 
 * @param {{
 * chatId: number,
 * userId: number,
 * }} option
 * @param option.chatId - Chat id to send message
 * @param option.userId - default is income_message.from.id,
 * @param option.wasCancelled - True if reservation was canceled
 * @returns 
 */
const sendNotification = async ({ chatId = defaultChannelId, bookedDay, wasCancelled = false }) => {
  await getConnection()

  if (!chatId) {
    return console.log('Chat id was not defined!')
  }

  if (!bookedDay) {
    return console.log('Booking was not defined!')
  }

  // Get whole schedule for defined day. Format msg and send it to the chatId
  const weekDay = new Date(bookedDay).getDay()

  // const startDay = 

  const bookings = await Schedule.find({})
    .where('datetime')
    .gt(date.getUTCTimeByCurrentWeekDay(weekDay, false))
    .lt(date.getUTCTimeByCurrentWeekDay(weekDay, true))
    .sort({ datetime: 1 })
    
  const msg = message.generate.generateNotificationMessageByData({ bookings, date: bookedDay, wasCancelled })
  // Generate message by booking data

  // lastBooking.car_plate lastBooking.full_name lastBooking.daytime

  bot.sendMessage(chatId, msg)
}

module.exports = { sendNotification }
