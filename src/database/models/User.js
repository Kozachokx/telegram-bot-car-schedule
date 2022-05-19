const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const userSchema = new Schema({
  id: {
    type: Number,
    required: true,
    unique: true
  },
  first_name: {
    type: String,
    required: true
  },
  last_name: {
    type: String,
    required: false
  },
  username: {
    type: String,
    required: true
  },
  car_plate: {
    type: Number,
    required: false
  },
  language_code: {
    type: String,
    default: 'uk'
  },
  is_admin: {
    type: Boolean,
    default: false
  }
}, { versionKey: false })

const User = mongoose.model('user', userSchema)

module.exports = { User };
