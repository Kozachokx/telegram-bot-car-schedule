const getDayStartOrEndByCurrentWeekDay = (day, endDate = false) => {
  // 23,59,59,999
  const today = endDate
    ? new Date(new Date().setHours(23,59,59,999))
    : new Date(new Date().setHours(0,0,0,0))
  return new Date(today.setDate(today.getDate() - today.getDay() + day));
}

module.exports = { getDayStartOrEndByCurrentWeekDay }
