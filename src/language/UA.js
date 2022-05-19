module.exports = {
  GREETING: 'Привіт, я телеграм бот для запису на автомийку',
  
  YOUR_PLATE: 'Номер вашого авто',
  CHOOSE_YOUR_PLATE: 'Оберіть номер вашого авто ',

  WEEK_DAY: {
    MONDAY: `Понеділок`,
    TUESDAY: `Вівторок`,
    WEDNESDAY: `Середа`,
    THURSDAY: `Четвер`,
    FRIDAY: `П'ятниця`,
    SATURDAY: `Субота`,
    SUNDAY: `Неділя`,
  },
  MONTH: {
    JANUARY: `Січень`,
    FEBRUARY: `Лютий`,
    MARCH: `Березень`,
    APRIL: `Квітень`,
    MAY: `Травень`,
    JUNE: `Червень`,
    JULY: `Липень`,
    AUGUST: `Серпень`,
    SEPTEMBER: `Вересень`,
    OCTOBER: `Жовтень`,
    NOVEMBER: `Листопад`,
    DECEMBER: `Грудень`,
  },

  generate: {
    PLATES_IS_NOT_REGISTERED: (plate) => {
      return `Номери ${plate} не зареєстровані в БД.`
    }
  }
}