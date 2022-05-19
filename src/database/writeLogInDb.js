const { getConnection } = require('./database');
const { Log } = require('./models');

const writeLogInDb = async (method, message, isError) => {
  try {
    await getConnection()
    await new Log({ method, message, isError }).save()
  } catch (error) { 
    console.log('[writeLogInDb] Error when try to write log in DB. Error: ', error)
  }
}

module.exports = { writeLogInDb }
