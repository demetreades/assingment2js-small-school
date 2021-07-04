const Person = require('./person').Person;

const _tuitionFees = new WeakMap();
const _dateOfBirth = new WeakMap();

class Student extends Person {
  constructor(id, firstName, lastName, tuitionFees, dateOfBirth) {
    super(id, firstName, lastName);
    this.tuitionFees = tuitionFees;
    this.dateOfBirth = this.dateUtil.dateFormatter(new Date(dateOfBirth));
  }

  get tuitionFees() {
    return _tuitionFees.get(this);
  }
  set tuitionFees(value) {
    if (isNaN(value) || value < 10 || value > 2500) {
      throw new Error(`Invalid tuition fees (max 2500€)`);
    }
    _tuitionFees.set(this, value);
  }

  get dateOfBirth() {
    return _dateOfBirth.get(this);
  }
  set dateOfBirth(value) {
    if (value > new Date('2004-01-01') || value < new Date('1949-01-01')) {
      throw new Error(`Invalid birthdate`);
    }
    _dateOfBirth.set(this, value);
  }

  toConsoleString = () => {
    return (
    `Student #${this.id} ${this.fullName()}   -   detail's:
    
    ---------------------
    Firstname:   ${this.firstName}
    Lastname:    ${this.lastName}
    Tuition:     ${this.tuitionFees}€
    Birthdate:   ${this.dateOfBirth}`
    )
  }
};

// console.log('\n\n----------------------------------');
// console.log('----------------------------------');
// const paulos = new Student(24, "paulos", "paulopoulos", '2222', new Date('1951-8-8'));
// console.log('\n', paulos, '\n\nPAULOS-clg------------------------');
// console.log('\n', paulos.toConsoleString(), '\n\nPAULOS-toString( )----------------\n\n');

module.exports = { Student };
