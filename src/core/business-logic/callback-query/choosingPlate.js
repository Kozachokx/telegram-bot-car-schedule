// choosingPlate({
//   chatId: cmd.message.chat.id,
//   msgData: cmd.data,
//   messageId: cmd.message.message_id,
// })
const { bot } = require('../../../bot');
const { getConnection } = require('../../../database');
const { Plate } = require('../../../database/models')
const option = require('../../../options/index')

const languagePack =  require('../../../language');

const platesPrefix = '/plates '
const paginationSize = 9;

/**
 * 
 * @param {{
 * chatId: number,
 * userId: number,
 * msgData: string,
 * messageId: number,
 * }} option
 * @param option.userId - default is income_message.from.id,
 * @param option.chatId - default is income_message.message.chat.id,
 * @param option.msgData - default is income_message.data,
 * @param option.messageId - default is income_message.message.message_id,
 * @returns 
 */
const choosingPlate = async ({ chatId, userId, msgData, messageId })  => {
  console.log(`🔵🟡  🔵🟡`)
  console.log(`${msgData}`)
  await getConnection()

  const currentPage = Number(`${msgData}`.match(new RegExp(/(?<=\/plates [0-9]>).*/gi))) || 1

  // First plate number 0xxx  => 0 | 1000
  const plateStartNumber = parseInt(msgData[platesPrefix.length])
  console.log('Choosed: ', plateStartNumber)

  let msgToDelete = await bot.sendMessage(chatId, 'Please wait. Reciving data from database...')
    .then((msgDelete) => msgDelete.message_id)

  let responceMsg = `${plateStartNumber}xxx`
  let allBy = await Plate.find({})
    .where('car_plate')
    .gte(plateStartNumber*1000)
    .lt((plateStartNumber+1)*1000)
    .sort({ car_plate: 1 })
    .skip((currentPage-1)*paginationSize)
    .limit(paginationSize+1)

  if(!allBy || !allBy.length) {
    responceMsg = languagePack[`UA`].generate.PLATES_IS_NOT_REGISTERED(`${plateStartNumber}xxx`)
  } else {
    allBy = allBy.map(el => el.car_plate)

    console.log(` ${plateStartNumber*1000} <= x > ${(plateStartNumber+1)*1000} `)
    console.log(' ')
    console.log(' Allby')
    console.log(allBy)
    console.log(' ')

    // const allBy = CAR_PLATES.filter(number => number >= plateStartNumber*1000-1 && number < (plateStartNumber+1)*1000 )
    //   .sort((a,b) => a-b)
    
    if (allBy[0] < 1000) allBy.forEach((num, i) =>  allBy[i] = String(num).padStart(4,'0'))
  }

  // POSSIBLE NO PLATES
  bot.deleteMessage(chatId, messageId)
  bot.deleteMessage(chatId, msgToDelete)

  bot.sendMessage(chatId, responceMsg, option.generate.platesByDbData(allBy, currentPage));
}

module.exports = { choosingPlate }
