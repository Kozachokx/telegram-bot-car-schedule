const { createMatrix } = require('../../shared');
const { date } = require('../../shared');
 
const genereteButton = (text, callback_data) => {
  return { text, callback_data }
}

const bookingsByDbData = (bookingsArray) => {
  const platesButtonsInLine = 1
  const additional = [{ text: 'Вийти', callback_data: `/deleteMsg>` }]
  const platesButtons = []

  if (bookingsArray && bookingsArray.length){
    const buttons = bookingsArray.map(booking => {
      const text = `${date.formatShortDateWithTime(booking.datetime)}   [${String(booking.car_plate).padStart(4,'0')}]`
      return genereteButton(text, `/cancel>${booking.datetime}`)
    })
    platesButtons.push(...createMatrix(buttons, platesButtonsInLine))
  }

  return {
    reply_markup: JSON.stringify({
      inline_keyboard: [...platesButtons, additional]
    })
  }
} 

module.exports = { bookingsByDbData }
