const formatMonthDateByDate = (date, dayFirst = true, splitSymbol = '.') => {
  date = new Date(date)
  // new Date().getUTCDay()
  const day = date.getUTCDate()
  const month = Number(date.getUTCMonth()) + 1
  return dayFirst
    ? `${String(day).padStart(2,'0')}${splitSymbol}${String(month).padStart(2,'0')}`
    : `${String(month).padStart(2,'0')}${splitSymbol}${String(day).padStart(2,'0')}`
}

module.exports = { formatMonthDateByDate }
