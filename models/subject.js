const Entity = require('./entity').Entity;

const _title       = new WeakMap();
const _description = new WeakMap();
const _startDate   = new WeakMap();
const _endDate     = new WeakMap();

class Subject extends Entity {
  constructor(id, title, description, startDate, endDate) {
    super(id)
    this.title       = title;
    this.description = description;
    this.startDate   = this.dateUtil.dateFormatter(new Date(startDate));
    this.endDate     = this.dateUtil.dateFormatter(new Date(endDate));
  }
  
  get title() {
    return _title.get(this);
  }
  set title(value) {
    if(value.length < 2) {
      throw new Error('Invalid title name');
    }
    _title.set(this,value);
  }

  get description() {
    return _description.get(this);
  }
  set description(value) {
    if(value.length < 2) {
      throw new Error('Invalid description name');
    }
    _description.set(this,value);
  }

  get startDate() {
    return _startDate.get(this);
  }
  set startDate(value) {
    if (value >= this.startDate || value < this.today) {
      throw new Error(`Invalid subject's start date`);
    }
    _startDate.set(this,value);
  }

  get endDate() {
    return _endDate.get(this);
  }
  set endDate(value) {
    if (value <= this.startDate || value < this.today) {
      throw new Error(`Invalid subject's end date`);
    }
    _endDate.set(this,value);
  }

  toString = () => {
    return (
      `Subject #${this.id} ${this.title}   -   details:
      
      -----------------------
      Title:        ${this.title}
      Description:  ${this.description}

      -----------------------
      Starts:       ${this.startDate}
      Ends:         ${this.endDate}`
    )
  }

};

// console.log('\n\n----------------------------------');
// console.log('----------------------------------');
// const OOP = new Subject(24, 'OOP II', 'please add description', new Date('2021-1-1'), new Date('2021-1-8'));
// console.log('\n', OOP, '\n\nSub-OOP-clg------------------------');
// console.log('\n', OOP.toConsoleString(), '\n\nSub-OOP-toString( )----------------\n\n');

module.exports = { Subject };
