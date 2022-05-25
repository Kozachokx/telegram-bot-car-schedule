const { createMatrix } = require('../../shared');

const timeRegExp = new RegExp(/[\d]+/g)

const selectDay = (platesArray, unixDay, backCommand) => {
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

module.exports = { selectDay }
