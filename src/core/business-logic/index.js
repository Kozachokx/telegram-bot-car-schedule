module.exports = {
  callback_query: require('./callback-query'),
  ...require('./addPlatelogic'),
  ...require('./sendNotification'),
}