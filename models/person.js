const Entity = require('./entity').Entity;
const validation = require('./validation');

const _firstName = new WeakMap();
const _lastName  = new WeakMap();

class Person extends Entity {
  constructor(id, firstName, lastName) {
    super(id);
    this.firstName = firstName;
    this.lastName  = lastName;
  }

  get firstName() {
    return _firstName.get(this);
  }

  set firstName(value) {
    validation.charTypeChecker(value, 'firstname');
    validation.charLenghtChecker(value, 2, 25, 'firstname');
    _firstName.set(this,value.charAt(0).toUpperCase() + value.slice(1).toLowerCase());
  }
  
  get lastName() {
    return _lastName.get(this);
  }
  
  set lastName(value) {
    validation.charTypeChecker(value, 'firstname');
    validation.charLenghtChecker(value, 2, 25, 'lastname');
    _lastName.set(this,value.charAt(0).toUpperCase() + value.slice(1).toLowerCase());
  }

  fullName = () => {
    return `${this.firstName} ${this.lastName}`;
  }

};

module.exports = { Person };
