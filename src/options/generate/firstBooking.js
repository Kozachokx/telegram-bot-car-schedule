const languagePack =  require('../../language');

const firstBooking = ({ plateString }) => {
  const buttonText = plateString
    ? `${languagePack[`UA`].CHANGE_PLATE}`
    : `${languagePack[`UA`].CHOOSE_PLATE}`

    const keyboard = [
    [{ text: buttonText, callback_data: `/change_car_plate` }]
  ]

  if (plateString) {
    keyboard[0].push({ text: `${languagePack[`UA`].CHOOSE_DATE}`, callback_data: `/week>0` })
  }

  return {
  reply_markup: JSON.stringify({
    inline_keyboard: keyboard
  })
  }
}

module.exports = { firstBooking }
