module.exports = {
  generate: {
    ...require('./generateBookMessage'),
    ...require('./generateNotificationMessageByData'),
    ...require('./getDayOfTheWeek'),
  }
}