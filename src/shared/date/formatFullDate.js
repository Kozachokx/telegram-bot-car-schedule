const { formatMonthDateByDate } = require('./formatMonthDateByDate');
const { formatDayTime } = require('./formatDayTime');

const formatFullDate = (date, withTime = false, splitSymbol = '.') => {
  let time = ''
  const dayAndMonth = formatMonthDateByDate(date, true, splitSymbol)
  if (withTime) time = formatDayTime(date)

  date = new Date(date)

  const year = date.getUTCFullYear()

  return `${dayAndMonth}${splitSymbol}${year} ${time}`
}

module.exports = { formatFullDate }
