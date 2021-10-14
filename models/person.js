const Entity = require('./entity').Entity;

const { properCase } = require('./utilities/textutil');
const validation = require('./utilities/validation');

const _firstName = new WeakMap();
const _lastName = new WeakMap();

class Person extends Entity {
  constructor(id, firstName, lastName) {
    super(id);
    this.firstName = firstName;
    this.lastName = lastName;
  }

  get firstName() {
    return _firstName.get(this);
  }

  set firstName(value) {
    validation.isValidCharacters(value, 'firstname');
    validation.isInRange(value, 2, 25, 'firstname');
    _firstName.set(this, properCase(value));
  }

  get lastName() {
    return _lastName.get(this);
  }

  set lastName(value) {
    validation.isValidCharacters(value, 'lastname');
    validation.isInRange(value, 2, 25, 'lastname');
    _lastName.set(this, properCase(value));
  }

  fullName() {
    return `${this.firstName} ${this.lastName}`;
  }
}

module.exports = { Person };
