const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const userSchema = new Schema({
  user_id: {
    type: Number,
    required: true
  },
  user_name: {
    type: String,
    required: true
  },
  car_plate: {
    type: Number,
    required: true
  },
  // user_id: Number,
})

const User = mongoose.model('user', userSchema)

module.exports = { User };
