const { formatDayTime } = require('./formatDayTime');
const { formatMonthDateByDate } = require('./formatMonthDateByDate');

const formatShortDateWithTime = (date, hourFirst = false) => {
  const dayMonth = formatMonthDateByDate(date)
  const dateTime = formatDayTime(date)
  date = new Date(date)

  return hourFirst
    ? `${dateTime} ${dayMonth}`
    : `${dayMonth} ${dateTime}`
}

module.exports = { formatShortDateWithTime }
