const Entity = require('./entity').Entity;
const validation = require('./validation');

const _title     = new WeakMap();
const _stream    = new WeakMap();
const _type      = new WeakMap();
const _startDate = new WeakMap();
const _endDate   = new WeakMap();

class Course extends Entity {
  constructor(id, title, stream, type, startDate, endDate) {
    super(id);
    this.title      = title;
    this.stream     = stream;
    this.type       = type;
    this.startDate  = this.dateUtil.dateFormatter(new Date(startDate));
    this.endDate    = this.dateUtil.dateFormatter(new Date(endDate));
  }

  get title() {
    return _title.get(this);
  }
  
  set title(value) {
    validation.charLenghtChecker(value, 2, 25, 'course title');
    _title.set(this,value.toUpperCase());
  }

  get stream() {
    return _stream.get(this);
  }

  set stream(value) {
    validation.charLenghtChecker(value, 2, 25, 'course stream');
    _stream.set(this,value);
  }

  get type() {
    return _type.get(this);
  }
  
  set type(value) {
    validation.charLenghtChecker(value, 2, 25, 'course type');
    _type.set(this,value);
  }

  get startDate() {
    return _startDate.get(this);
  }

  set startDate(value) {
    if (value > this.dateUtil.today) {
      throw new Error(`Invalid course start date ${value} cannot exceed ${this.dateUtil.today}`);
    }
    _startDate.set(this,value);
  }

  get endDate() {
    return _endDate.get(this);
  }

  set endDate(value) {
    if (value < this.startDate) {
      throw new Error(`Invalid course end date ${value} cannot exceed ${this.startDate} or ${this.dateUtil.today}`);
    }
    _endDate.set(this,value);
  }

  fullTitle = () => {
    return `${this.title} ${this.stream} ${this.type}`
  }

  toConsoleString = () => {
    return ( 
      `Course #${this.id} ${this.fullTitle()}    -    detail's:
      
      -----------------------
      Title:   ${this.title}
      Stream:  ${this.stream}
      Type:    ${this.type}
      -----------------------
      Starts:  ${this.startDate}
      Ends:    ${this.endDate}`
    );
  }
  
};

// console.log('\n\n----------------------------------');
// console.log('----------------------------------');
// const CB69 = new Course(24, 'CB69', 'JavaScripta', 'No Time',  '2021/1/1', '2021/9/1');
// console.log('\n', CB69, '\n\nCB69-clg------------------------');
// console.log('\n', CB69.toConsoleString(), '\n\nCB69-toString( )----------------\n\n');

module.exports = { Course };
