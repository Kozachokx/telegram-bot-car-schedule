// arr[ '11:40', '11:00' ]
const generateSelectHourOptions = (arr) => {
  arr.map()
}

// this week = 0 | nextWeek = 1 | previousWeek = -1
const genereteChooseDayOptions = (week = 0) => {
  const choosen = week * 7
  const prefix = `/week>${week}>`
  const additional = []
  if (week > 0) {
    // then Previous button
    additional.push({text: 'Previous week', callback_data: `/week>${week-1}`})
  }
  if (week < 1) {
    // then Next button
    additional.push({text: 'Next week', callback_data: `/week>${week+1}`})
  }

  const keyboard = [
        [{text: 'Понеділок', callback_data: `${prefix}${choosen + 1}`}, {text: 'Вівторок', callback_data: `${prefix}${choosen + 2}`}],
        [{text: 'Середа', callback_data: `${prefix}${choosen + 3}`}, {text: 'Четвер', callback_data: `${prefix}${choosen + 4}`}],
        [{text: 'П\'ятниця', callback_data: `${prefix}${choosen + 5}`}, {text: 'Субота', callback_data: `${prefix}${choosen + 6}`}],
        [ ...additional ]
      ]

  return {
    reply_markup: JSON.stringify({
      inline_keyboard: keyboard
    })
  }
}

const platesPrefix = '/plates '

module.exports = {
  genereteChooseDayOptions,

  startOptions: {
    reply_markup: JSON.stringify({
      resize_keyboard: true,
      keyboard: [
        [{text: '✅Записатись на мийку'}],
        [{text: 'Скасувати резервацію'}]
      ]
    })
  },

  selectCarPlatesOption: {
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