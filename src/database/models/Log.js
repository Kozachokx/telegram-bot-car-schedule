const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const logSchema = new Schema({
  timestamp: {
    type: Date,
    default: Date.now
  },
  method: {
    type: String,
  },
  message: {
    type: String,
  },
  isError: {
    type: Boolean,
    default: false
  },
}, { versionKey: false })

const Log = mongoose.model('log', logSchema)

module.exports = { Log };
