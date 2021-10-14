const { Person } = require('./person');

const validation = require('./utilities/validation');

const _subjectsId = new WeakMap();
const _coursesId = new WeakMap();

class Trainer extends Person {
  constructor(id, firstName, lastName, subjectsId, coursesId) {
    super(id, firstName, lastName);
    this.subjectsId = subjectsId;
    this.coursesId = coursesId;
  }

  get subjectsId() {
    return _subjectsId.get(this);
  }

  set subjectsId(value) {
    if (value !== undefined) {
      validation.isNumber(value, "trainer's subject id");
      validation.isInRange(value, 1, null, "trainer's subject id");
    }
    _subjectsId.set(this, value);
  }

  get coursesId() {
    return _coursesId.get(this);
  }

  set coursesId(value) {
    if (value !== undefined) {
      validation.isNumber(value, "trainer's course id");
      validation.isInRange(value, 1, null, "trainer's course id");
    }
    _coursesId.set(this, value);
  }

  toConsoleString() {
    return `Trainer #${this.id} ${this.fullName()}   -   detail's:
      
      -----------------------
      Firstname:  ${this.firstName} 
      Lastname:   ${this.lastName}
      Subjects:   ${this.subjectsId}
      -----------------------
      Course:     ${this.coursesId}`;
  }
}

// console.log('\n\n----------------------------------');
// console.log('----------------------------------');
// const petros = new Trainer(24, "petros", "petropoulos", 1, 1);
// console.log('\n', petros, '\n\nPETROS-TRAINER-clg------------------------');
// console.log('\n', petros.toConsoleString(), '\n\nPETROS-TRAINER-toString( )------------\n\n');

module.exports = { Trainer };
