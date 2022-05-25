// 1,2,3,4,5,6,7
// from current week - 1 monday, 7 sunday, 8 -next week monday. Etc
const getUTCTimeByCurrentWeekDay = (day, endDate = false) => {
  const today = endDate
    ? new Date(new Date().setUTCHours(23,59,59,999))
    : new Date(new Date().setUTCHours(0,0,0,0))

  const result = new Date(today.setUTCDate(today.getUTCDate() - today.getUTCDay() + day)).getTime();

  console.log('getUTCTimeByCurrentWeekDay > returns \t> ', new Date(result), '\t'  ,result)

  return result;
}

module.exports = { getUTCTimeByCurrentWeekDay } 
