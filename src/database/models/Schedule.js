const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const scheduleSchema = new Schema({
  date_unix: {
    type: Number,
    required: true,
    unique: true
  },
  user_name: {
    type: String,
    required: true
  },
  car_plate: {
    type: Number,
    required: true
  },
})

const Schedule = mongoose.model('schedule', scheduleSchema)

module.exports = { Schedule };
