const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const scheduleSchema = new Schema({
  // Date.now() / 1000 | Int
  // date: {
  //   type: Date,
  //   required: true,
  //   unique: true
  // },
  datetime: {
    type: Number,
    required: true,
    unique: true
  },
  id: {
    type: Number,
    required: true
  },
  user_fullname: {
    type: String,
    required: true
  },
  car_plate: {
    type: Number,
    required: true
  },
  created_at: { type: Date, default: Date.now() }
}, { 
  versionKey: false,
  // timestamps: { createdAt: 'created_at' }
})


// scheduleSchema.pre('save', (next) => {
//   this.created_at = Date.now();
//   next();
// })

const Schedule = mongoose.model('schedule', scheduleSchema)

module.exports = { Schedule };
