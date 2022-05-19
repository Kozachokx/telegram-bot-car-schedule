const getMonday = (d) => {
  d = new Date(d);
  var day = d.getDay(),
      diff = d.getDate() - day + (day == 0 ? -6:1); // adjust when day is sunday
  return new Date(d.setDate(diff));
}

getMonday(new Date()); // Mon Nov 08 2010

// 1,2,3,4,5,6,7
const getDay = (day, endDate = false) => {
  // 23,59,59,999
  const today = endDate
    ? new Date(new Date().setHours(23,59,59,999))
    : new Date(new Date().setHours(0,0,0,0))
  return new Date(today.setDate(today.getDate() - today.getDay() + day));
}

const getUnixTimeByFromCurrentWeek = (day, endDate = false) => {
  // 23,59,59,999
  const todayWas = endDate
    ? new Date(new Date().setHours(23,59,59,999))
    : new Date(new Date().setHours(0,0,0,0))
  const today = endDate
    ? new Date(new Date().setUTCHours(23,59,59,999))
    : new Date(new Date().setUTCHours(0,0,0,0))

  const td = new Date()
  console.log(' trest > ', new Date(td.setUTCDate( td.getUTCDate() - td.getUTCDay() + day )))

  const result = new Date(today.setUTCDate(today.getUTCDate() - today.getUTCDay() + day)).getTime();

  // console.log('getUnixTimeByFromCurrentWeek > today > ',today)
  // console.log(`getUnixTimeByFromCurrentWeek > ${endDate ? 'END' : 'START'} \t\t> `, new Date(today.setUTCDate(today.getUTCDate() - today.getUTCDay() + day)))
  console.log('getUnixTimeByFromCurrentWeek > returns \t> ', new Date(result), '\t'  ,result)
  // console.log('getUnixTimeByFromCurrentWeek > WASreturns > \t', new Date(new Date(todayWas.setDate(todayWas.getDate() - todayWas.getDay() + day)).getTime()), '\t' ,new Date(todayWas.setDate(todayWas.getDate() - todayWas.getDay() + day)).getTime())

  return result;
}

// module.exports = { 
//   getDay,
//   getDayUnixTime,
//  }

module.exports = { getDay, getUnixTimeByFromCurrentWeek }
