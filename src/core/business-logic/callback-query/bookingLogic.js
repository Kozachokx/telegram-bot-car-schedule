const { bot } = require('../../../bot');
const { Schedule, User } = require('../../../database/models');
const { getConnection } = require('../../../database')
const { sendNotification } = require('../sendNotification');

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
const bookingLogic = async ({ chatId, userId, msgData }) => {
  console.log(' Booking process')
  // const user = cmd.from
  const datetime = Number(`${msgData}`.match(new RegExp(/(?<=\/book>).*/gi)))

  console.log('Unix time: ', datetime)
  console.log('U day: ', new Date(datetime))

  await getConnection()
  const booked = await Schedule.findOne({ datetime })
  if (booked) {
    return bot.sendMessage(chatId, 'Вибачте, ця година уже зайнята.')
  }

  const user = await User.findOne({ id: userId })

  if (!user || !user.car_plate) {
    return bot.sendMessage(chatId, `You wasn't authorized or you don't have assigned car plate. Write: /start`)
  }

  const newBook = await new Schedule({
    id: user.id,
    datetime,
    user_fullname: `${user.first_name} ${user.last_name || ''}`,
    car_plate: user.car_plate,
  }).save()

  // const toSave = new Date(newBook.datetime).toLocaleString("es-CL")
  const savedDateUTC = `${new Date(datetime).getUTCDate()}-${new Date(datetime).getUTCMonth()+1}-${new Date(datetime).getUTCFullYear()} ${String(new Date(datetime).getUTCHours()).padStart(2,'0')}:${String(new Date(datetime).getUTCMinutes()).padStart(2,'0')}`

  return bot.sendMessage(chatId, `You just booked\t${savedDateUTC}`).then( async () => await sendNotification({ bookedDay: datetime }))
}

module.exports = { bookingLogic }
