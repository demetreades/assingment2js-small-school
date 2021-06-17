class Order {
  constructor(id, createdAt, updatedAt, customerId) {
      this.id = id
      this.createdAt = createdAt
      this.updatedAt = updatedAt
      this.customerId = customerId
  }

  get id() {
      return this._id
  }

  set id(value) {
    this._id = value
  }

  get createdAt() {
    return this._createdAt
  }

  set createdAt(value) {
    this._createdAt = value
  }

  get updatedAt() {
      return this._updatedAt
  }

  set updatedAt(value) {
    this._updatedAt = value
  }

  get customerId() {
    return this._customerId
  }

  set customerId(value) {
    this._customerId = value
  }

  toString() {
      return `Order {id: ${this.id}, createdAt: ${this.createdAt}, updatedAt: ${this.updatedAt}, customerId: ${this.customerId}}`
  }

};

module.exports = { Order }
