class DateUtil {
  constructor() {
    this.today = new Date();
  }

  dateFormatter = (date) => {
    const yyyy  = date.getFullYear();
    const mm    = (date.getMonth() + 1).toString().padStart(2, '0');
    const dd    = date.getDate().toString().padStart(2, '0');
    return `${yyyy}-${mm}-${dd}`;
  }

  timeFormatter = (date) => {
    const hh    = date.getHours().toString().padStart(2, '0');
    const mm    = date.getMinutes().toString().padStart(2, '0');
    const ss    = date.getSeconds().toString().padStart(2, '0');
    return `${hh}:${mm}:${ss}`;
  }

  dateTime = (date) => {
    return `${this.dateFormatter(date)} ${this.timeFormatter(date)}`;
  }
  
};

module.exports = { DateUtil };
