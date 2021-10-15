const Entity = require('./entity');

const properCase = require('./utilities/textutil');
const validation = require('./utilities/validation');

const _title = new WeakMap();
const _details = new WeakMap();
const _startDate = new WeakMap();
const _endDate = new WeakMap();

module.exports = class Subject extends Entity {
  constructor(id, title, details, startDate, endDate) {
    super(id);
    this.title = title;
    this.details = details;
    this.startDate = this.dateUtil.dateFormatter(new Date(startDate));
    this.endDate = this.dateUtil.dateFormatter(new Date(endDate));
  }

  get title() {
    return _title.get(this);
  }

  set title(value) {
    validation.isInRange(value, 2, 25, "subject's title");
    _title.set(this, properCase(value));
  }

  get details() {
    return _details.get(this);
  }

  set details(value) {
    validation.isInRange(value, 2, 100, "subject's details");
    _details.set(this, properCase(value));
  }

  get startDate() {
    return _startDate.get(this);
  }

  set startDate(value) {
    validation.isInRange(
      value,
      null,
      this.dateUtil.today,
      "subject's start date"
    );
    _startDate.set(this, value);
  }

  get endDate() {
    return _endDate.get(this);
  }

  set endDate(value) {
    validation.isInRange(
      value,
      this.startDate,
      this.dateUtil.today,
      "subject's end date"
    );
    _endDate.set(this, value);
  }

  toConsoleString() {
    return `Subject #${this.id} ${this.title}   -   details:
      
      -----------------------
      Title:        ${this.title}
      Details:      ${this.details}

      -----------------------
      Starts:       ${this.startDate}
      Ends:         ${this.endDate}`;
  }
};
