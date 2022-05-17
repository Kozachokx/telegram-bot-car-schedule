const mongoose = require('mongoose')
const Schema = mongoose.Schema;

// const validatePlate = (plate) => {
//   return parseInt(plate) >= 0 && parseInt(plate) <= 9999
// }

const platesSchema = new Schema({
  car_plate: {
    type: Number,
    min: 0,
    max: 9999,
    required: true,
    // require: true,
    unique: true,
    // validate: [validatePlate, 'Please fill valid plate number']
  },
})

const Plate = mongoose.model('plates', platesSchema)

platesSchema.pre('save', (next) => {
  console.log(' ')
  console.log(' PRE ')
  console.log(' ')
  notify(this.get());
  next();
})

// Plate.save

module.exports = { Plate };
