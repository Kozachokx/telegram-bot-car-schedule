module.exports = {
  GREETING: 'Привіт, я телеграм бот для запису на автомийку',
  
  BOOK_WASH_SLOT: 'Записатись на мийку',
  CANCEL_BOOKING: 'Скасувати резервацію',

  YOUR_PLATE: 'Номер вашого авто',
  CHANGE_PLATE: 'Змінити номер авто',
  CHOOSE_PLATE: 'Обрати номер',
  CHOOSE_YOUR_PLATE: 'Оберіть номер вашого авто ',
  
  CHOOSE_DATE: 'Обрати дату',

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