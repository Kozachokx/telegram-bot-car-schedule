const languagePack = require('../../language');
const { genereteSchedule } = require('../../const');
const { getDayOfTheWeek } = require('./getDayOfTheWeek');
const { formatDayTime, formatFullDate } = require('../date');

const generateNotificationMessageByData = ({ bookings, wasCancelled = false, date, language_code = 'UA' }) => {
  const scheduleTemplate = genereteSchedule()

  const forDate = new Date(date)
  const weekstr = getDayOfTheWeek(forDate.getDay())
  const dateStr = `${weekstr} ${formatFullDate(forDate)}`

  let lastBooking = {}

  if (bookings && bookings.length) {
    lastBooking = bookings.reduce(function(prev, current) {
      return (prev.created_at > current.created_at) ? prev : current
    }, bookings[0])
    
    bookings.map(booking => {
      const key = `${String(new Date(booking.datetime).getUTCHours()).padStart(2, '0')}:${String(new Date(booking.datetime).getUTCMinutes()).padStart(2, '0')}`
      scheduleTemplate[`${key}`].message = `${String(booking.car_plate).padStart(4,'0')} ${booking.user_fullname}`
    })
  }

  // const msg = ``

  const reservation = wasCancelled ? '' : `Автомобіль ${String(lastBooking.car_plate).padStart(4, '0')} зайняв ${formatDayTime(lastBooking.datetime)}\n\n`
  const bkText = Object.keys(scheduleTemplate).map(key => `${key} - ${scheduleTemplate[`${key}`].message}`).join('\n')

  return `${dateStr}\n\n${reservation}${bkText}\n\nДля запису або відміни скористайтесь ботом.`;
}

module.exports = { generateNotificationMessageByData }