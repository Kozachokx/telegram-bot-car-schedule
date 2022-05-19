const languagePack = require('../language');
const getDayOfTheWeek = (dayNum, language = 'UA') => {
  // const weekDays = ['SUNDAY', 'MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY']
  const day = dayNum == 0 ? 6 : dayNum-1
  const weekDays = Object.keys(languagePack['UA'].WEEK_DAY)
  return languagePack['UA'].WEEK_DAY[`${weekDays[day]}`]
}

const getMonthOfYear = (monthNum, language = 'UA') => {
  const month = ['SUNDAY', 'MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY']
  return languagePack['UA'].WEEK_DAY[`${weekDays[monthNum]}`]
}

// function getDayUnixTime(day, endDate = false) {
//   const today = endDate
//     ? new Date(new Date().setHours(23,59,59,999))
//     : new Date(new Date().setHours(0,0,0,0))
//   return parseInt(new Date(today.setDate(today.getDate() - today.getDay() + day)).getTime() / 1000);
// }

const getDayUnixTime = (day, endDate = false) => {
  // 23,59,59,999
  const today = endDate
    ? new Date(new Date().setHours(23,59,59,999))
    : new Date(new Date().setHours(0,0,0,0))
  return parseInt(new Date(today.setDate(today.getDate() - today.getDay() + day)).getTime() / 1000);
}

module.exports = { getDayUnixTime, getDayOfTheWeek }
