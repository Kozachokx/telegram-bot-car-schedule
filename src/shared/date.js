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

module.exports = { getDayUnixTime }
