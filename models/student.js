const Person = require('./person');
const Fees = require('./fees');

const validation = require('./utilities/validation');

const _tuitionFees = new WeakMap();
const _dateOfBirth = new WeakMap();

module.exports = class Student extends Person {
  constructor(id, firstName, lastName, fees, discount, dateOfBirth) {
    super(id, firstName, lastName);
    this.tuitionFees = new Fees(fees, discount);
    this.dateOfBirth = this.dateUtil.dateFormatter(new Date(dateOfBirth));
  }

  get tuitionFees() {
    return _tuitionFees.get(this);
  }

  set tuitionFees(value) {
    validation.isInstanceOf(value, Fees, 'Fees');
    _tuitionFees.set(this, value);
  }

  get dateOfBirth() {
    return _dateOfBirth.get(this);
  }

  set dateOfBirth(value) {
    validation.isInRange(
      value,
      this.dateUtil.minMaxBirthdate(55),
      this.dateUtil.minMaxBirthdate(18),
      "student's date of birth"
    );
    _dateOfBirth.set(this, value);
  }

  toConsoleString() {
    return `Student #${this.id} ${this.fullName()}   -   detail's:
    
    ---------------------
    Firstname:    ${this.firstName}
    Lastname:     ${this.lastName}
    ---------------------
    Tuition fees: ${this.tuitionFees.total}€
    Discount:     ${this.tuitionFees.discount}%
    Birthdate:    ${this.dateOfBirth}`;
  }
};
