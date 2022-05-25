const platesPrefix = '/plates '

module.exports = {
  selectCarPlatesTemplate: {
    reply_markup: JSON.stringify({
      inline_keyboard: [
        [{text: '0xxx', callback_data: `${platesPrefix}0`}, {text: '1xxx', callback_data: `${platesPrefix}1`}],
        [{text: '2xxx', callback_data: `${platesPrefix}2`}, {text: '3xxx', callback_data: `${platesPrefix}3`}],
        [{text: '4xxx', callback_data: `${platesPrefix}4`}, {text: '5xxx', callback_data: `${platesPrefix}5`}],
        [{text: '6xxx', callback_data: `${platesPrefix}6`}, {text: '7xxx', callback_data: `${platesPrefix}7`}],
        [{text: '8xxx', callback_data: `${platesPrefix}8`}, {text: '9xxx', callback_data: `${platesPrefix}9`}]
      ]
    })
  }
}