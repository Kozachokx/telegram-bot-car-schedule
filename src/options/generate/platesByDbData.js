const { createMatrix } = require('../../shared');

const genereteButton = (text, callback_data) => {
  return { text, callback_data }
}

const paginationSize = 9;

const platesByDbData = (platesArray, page) => {
  const platesButtonsInLine = 3
  const additional = [{ text: 'Назад', callback_data: `/change_car_plate` }]
  const platesButtons = []

  if (page > 1) {
    // then Previous button
    additional.push({text: 'Previous page', callback_data: `/plates ${String(platesArray[0])[0]}>${page-1}`})
  }

  if (platesArray && platesArray.length){
    if (platesArray.length > paginationSize) {
      platesArray.splice(platesArray.length-1)
      // Add - Next button
      additional.push({text: 'Next page', callback_data: `/plates ${String(platesArray[0])[0]}>${page+1}`})
    }
    const buttons = platesArray.map(plate => genereteButton(plate, `/plate ${plate}`))
    platesButtons.push(...createMatrix(buttons, platesButtonsInLine))
  }


  // if (platesArray.length > paginationSize) {
  //   // then Next button
  //   additional.push({text: 'Next page', callback_data: `/plates ${String(platesArray[0])[0]}>${page+1}`})
  // }

  return {
    reply_markup: JSON.stringify({
      inline_keyboard: [...platesButtons, additional]
    })
  }
} 

module.exports = { platesByDbData }
