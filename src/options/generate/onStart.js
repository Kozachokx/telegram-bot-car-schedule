const languagePack =  require('../../language');

const startOptions = (language_code) => {
  return {
    reply_markup: JSON.stringify({
      resize_keyboard: true,
      keyboard: [
        [{text: `✅${languagePack['UA'].BOOK_WASH_SLOT}`}],
        [{text: `❎${languagePack['UA'].CANCEL_BOOKING}`}]
      ]
    })
  }
}

module.exports = { startOptions }
