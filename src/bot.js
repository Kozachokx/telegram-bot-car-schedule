const TelegramBot = require('node-telegram-bot-api');
const CONFIG = require('./config')

const token = CONFIG.TELEGRAM_TOKEN

const bot = new TelegramBot(token, {polling: true})

module.exports = { bot }
