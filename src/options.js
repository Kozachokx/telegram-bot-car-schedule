module.exports = {
  startOptions: {
    reply_markup: JSON.stringify({
      resize_keyboard: true,
      keyboard: [
        [{text: 'Записатись на мийку'}],
        [{text: 'Скасувати резервацію'}]
      ]
    })
  },

  selectCarPlatesOption: {
    reply_markup: JSON.stringify({
      inline_keyboard: [
        [{text: '0xxx', callback_data: '/0'}, {text: '1xxx', callback_data: '/1'}],
        [{text: '2xxx', callback_data: '/2'}, {text: '3xxx', callback_data: '/3'}],
        [{text: '4xxx', callback_data: '/4'}, {text: '5xxx', callback_data: '/5'}],
        [{text: '6xxx', callback_data: '/6'}, {text: '7xxx', callback_data: '/7'}],
        [{text: '8xxx', callback_data: '/8'}, {text: '9xxx', callback_data: '/9'}]
      ]
    })
  }
}