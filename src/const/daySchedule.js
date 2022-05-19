const daySchedule = {
  '09:00' : { index: 0, message: 'Вільно', isOpen: true },
  '09:40' : { index: 1, message: 'Вільно', isOpen: true },
  '10:20' : { index: 2, message: 'Вільно', isOpen: true },
  '11:00' : { index: 3, message: 'Вільно', isOpen: true },
  '11:40' : { index: 4, message: 'Вільно', isOpen: true },
  '12:20' : { index: 5, message: 'Вільно', isOpen: true },
  '13:00' : { index: 6, message: 'Вільно', isOpen: true },
  '13:40' : { index: 7, message: 'Вільно', isOpen: true },
  '14:20' : { index: 8, message: 'Вільно', isOpen: true },
  '15:00' : { index: 9, message: 'Вільно', isOpen: true },
  '15:40' : { index: 10, message: 'Вільно', isOpen: true },
  '16:20' : { index: 11, message: 'Вільно', isOpen: true },
  '17:00' : { index: 12, message: 'Вільно', isOpen: true },
  '18:20' : { index: 13, message: 'Вільно', isOpen: true },
  '19:00' : { index: 14, message: 'Вільно', isOpen: true },
  '19:40' : { index: 15, message: 'Вільно', isOpen: true },
}

const genereteSchedule = () => {
  return JSON.parse(JSON.stringify(daySchedule))
}

module.exports = { genereteSchedule }
