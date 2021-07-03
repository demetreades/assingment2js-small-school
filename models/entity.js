const DateUtil = require('./dateutil').DateUtil;

const _id = new WeakMap();
// const _createdAt = new WeakMap();

class Entity {
  constructor(id) {
    this.id        = id;
    this.dateUtil  = new DateUtil;
  }

  get id() {
    return _id.get(this);
  }

  set id(value) {
    if(this.id !== undefined) {
      if (isNaN(value) || value < 1) {
        throw new Error('Invalid id')
      }
    }
    _id.set(this, value);
  }

};

module.exports = { Entity };
