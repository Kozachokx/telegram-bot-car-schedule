const languagePack = require('../../language');

/**
 * 
 * @param { Number } dayNum - default new Date(x).getDay()
 * @param {*} language 
 * @returns 
 */
const getDayOfTheWeek = (dayNum, language = 'UA') => {
  // const weekDays = ['SUNDAY', 'MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY']
  const day = dayNum == 0 ? 6 : dayNum-1
  const weekDays = Object.keys(languagePack['UA'].WEEK_DAY)
  return languagePack['UA'].WEEK_DAY[`${weekDays[day]}`]
}

module.exports = { getDayOfTheWeek }
