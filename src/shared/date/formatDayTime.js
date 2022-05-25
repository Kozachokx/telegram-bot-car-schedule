const formatDayTime = (date, splitSymbol = ':') => {
  date = new Date(date)
  const hour = date.getUTCHours()
  const minute = date.getUTCMinutes()

  return `${String(hour).padStart(2,'0')}${splitSymbol}${String(minute).padStart(2,'0')}`
}

module.exports = { formatDayTime }
