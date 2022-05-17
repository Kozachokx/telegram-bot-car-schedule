// const { MongoClient } = require('mongodb')

const mongoose = require('mongoose');
mongoose.Promise = global.Promise
mongoose.set('debug', true)

const { User, Plates, Schedule } = require('./models');

const CONFIG = require('../config')
// console.log(CONFIG.DB)

const getConnection = async () => {
  if (!CONFIG.DB) throw new Error('DB Connection is not defined!')

  try {
    const connection = await mongoose.connect(
      CONFIG.DB,
      {
          useNewUrlParser: true,
      },
      () => {
          console.log("Database is connected");
      }
    );

    console.log(' ')
    console.log(' CONNECTIONS')
    console.log(mongoose.connections.length)
    console.log(' ')

    return connection;
  } catch (error) {
    console.log('Error while connectiong to db. Error: ', error)
  }
}

mongoose.connection.on('error', (error) => console.error('MongoDB connection error:', error))

module.exports = { getConnection }

// magic_user
// rndMg1cPasw0rd
// mongodb+srv://magic_user:<rndMg1cPasw0rd>@clustertelegrambotwash.b7cl4.mongodb.net/myFirstDatabase?retryWrites=true&w=majority

