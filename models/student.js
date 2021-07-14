const Person     = require('./person').Person;
const Fees       = require('./fees').Fees;

const validation = require('./utilities/validation');

const _tuitionFees = new WeakMap();
const _dateOfBirth = new WeakMap();

class Student extends Person {
  constructor(id, firstName, lastName, fees, discount, dateOfBirth) {
    super(id, firstName, lastName);
    this.tuitionFees = new Fees(fees, discount);
    this.dateOfBirth = this.dateUtil.dateFormatter(new Date(dateOfBirth));
  }

  get tuitionFees() {
    return _tuitionFees.get(this);
  }

  set tuitionFees(value) {
    if (!(value instanceof Fees)) {
      throw new Error(`Invalid tuition fees`);
    }
    _tuitionFees.set(this, value);
  }

  get dateOfBirth() {
    return _dateOfBirth.get(this);
  }
  
  set dateOfBirth(value) {
    validation.rangeChecker(value, this.dateUtil.minMaxBirthdate(55), this.dateUtil.minMaxBirthdate(18), `student's date of birth`)
    _dateOfBirth.set(this, value);
  }

  toConsoleString = () => {
    return (
    `Student #${this.id} ${this.fullName()}   -   detail's:
    
    ---------------------
    Firstname:    ${this.firstName}
    Lastname:     ${this.lastName}
    ---------------------
    Tuition fees: ${this.tuitionFees.total}€
    Discount:     ${this.tuitionFees.discount}%
    Birthdate:    ${this.dateOfBirth}`
    );
  }
};

console.log('\n\n----------------------------------');
console.log('----------------------------------');
const paulos = new Student(33, "paULOs", "pauLOPoulos", 2500, 10, '01/04/1984');
console.log('\n', paulos, '\n\nPAULOS-clg------------------------');
console.log('\n', paulos.toConsoleString(), '\n\nPAULOS-toString( )----------------\n\n');


module.exports = { Student };
