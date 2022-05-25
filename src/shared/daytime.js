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


// module.exports = { 
//   getDay,
//   getDayUnixTime,
//  }

module.exports = { getDay }
