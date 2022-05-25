// this week = 0 | nextWeek = 1 | previousWeek = -1
const chooseExactDay = (week = 0) => {
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

module.exports = { chooseExactDay }
