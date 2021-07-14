class DateUtil {
  constructor() {
    this.today = this.dateFormatter(new Date());
  }

  dateFormatter = (date) => {
    const yyyy  = date.getFullYear();
    const mm    = (date.getMonth() + 1).toString().padStart(2, '0');
    const dd    = date.getDate().toString().padStart(2, '0');
    return `${yyyy}-${mm}-${dd}`;
  }

  timeFormatter = (date) => {
    const hh  = date.getHours().toString().padStart(2, '0');
    const mm  = date.getMinutes().toString().padStart(2, '0');
    const ss  = date.getSeconds().toString().padStart(2, '0');
    return `${hh}:${mm}:${ss}`;
  }

  dateTime = (date) => {
    return `${this.dateFormatter(date)} ${this.timeFormatter(date)}`;
  }
  
  minMaxBirthdate = (age) => {
    return this.dateFormatter(new Date()).replace(new Date().getFullYear(), new Date().getFullYear() - age);
  }
  
};

// const dateUtil = new DateUtil();
// console.log(dateUtil.dateFormatter(new Date('1999/01/01')));
// console.log(dateUtil.minMaxBirthdate(18));
// console.log(dateUtil.minMaxBirthdate(55));
// console.log(dateUtil.dateFormatter(dateUtil.today));
// console.log('\n--------------------------------------\n');
// console.log('\n', dateUtil);


module.exports = { DateUtil };
