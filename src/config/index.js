const dotenv = require('dotenv')
const path = require('path')
const ENV = process.env;
const dotenvPath = path.join(__dirname, '../../', `.env`);

dotenv.config({
  path: dotenvPath
})

const config = {
  DB: ENV.DATABASE,
  TELEGRAM_TOKEN: ENV.TELEGRAM_TOKEN,
  TELEGRAM_CHANNEL: ENV.TELEGRAM_CHANNEL,
  SUPERUSER_TOKEN: ENV.SUPERUSER_TOKEN,
}

console.log(config)

module.exports = config
