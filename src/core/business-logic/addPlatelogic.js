const { bot } = require('../../bot');
const { User, Plate } = require('../../database/models');
const { getConnection } = require('../../database')

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
const addPlatelogic = async ({ chatId, userId, msgData }) => {
  await getConnection()
  const user = await User.findOne({ id: userId })

  if (!user) {
    return bot.sendMessage(chatId, `Wrong sequesnce! You are not authorized. Write: /start`)
  }

  if(user.is_admin) {
    bot.sendMessage(chatId, 'Write car plate number').then(
      (msgRes) => {
        bot.once('message', async (ms) => {
          try {
            const plate =  Number.isNaN(Number(ms.text)) ? null : parseInt(ms.text)
            if (plate === null || plate < 0 || plate > 9999) {
              return bot.sendMessage(ms.chat.id, `Wrong car plate number: '${ms.text}'`)
            }

            await getConnection()

            const exists = await Plate.findOne({ car_plate: plate })
            console.log(' Hey it: ', !!exists)
            if (exists) {
              return bot.sendMessage(ms.chat.id, 'Car plate already exists in DB')
            }
  
            const newPlate = new Plate({ car_plate: plate })

            await newPlate.save().then(() => {
              const number = plate < 1000 ? String(plate).padStart(4,'0') : plate
              bot.sendMessage(chatId, `Car plate '${number}' successfully saved.`)
            })
          } catch (err) {
            console.log('Error happend! Error: ', err)
          }
        })
      }
    )
  } else {
    bot.sendMessage(chatId, 'Access denied!')
  }
}

module.exports = { addPlatelogic }
