const validation = require('./utilities/validation');

const _amount = new WeakMap();
const _discount = new WeakMap();
const _discountAmount = new WeakMap();
const _total = new WeakMap();

module.exports = class Fees {
  constructor(amount, discount) {
    this.amount = amount;
    this.discount = discount;
    this.discountAmount = amount * (this.discount * 0.01);
    this.total = amount - this.discountAmount;
  }

  get amount() {
    return _amount.get(this);
  }

  set amount(value) {
    validation.isNumber(value, 'fees amount');
    validation.isInRange(value, 0, null, 'fees amount');
    _amount.set(this, value);
  }

  get discount() {
    return _discount.get(this);
  }

  set discount(value) {
    validation.isNumber(value, 'fees discount rate');
    validation.isInRange(value, 0, 100, 'fees discount rate');
    _discount.set(this, value);
  }

  get discountAmount() {
    return _discountAmount.get(this);
  }

  set discountAmount(value) {
    validation.isNumber(value, 'fees discount amount');
    validation.isInRange(value, 0, null, 'fees discount amount');
    _discountAmount.set(this, value);
  }

  get total() {
    return _total.get(this);
  }

  set total(value) {
    validation.isNumber(value, 'total fees');
    // validation.isInRange(value, 0, null, 'total fees');
    _total.set(this, value);
  }

  toConsoleString() {
    return `Tuition fees   -   details:

      Starting amount:  ${this.amount}€
      Discount rate:    ${this.discount}%
      Discount amount:  ${this.discountAmount}€
      -----------------------
      Total fees:       ${this.total}€`;
  }
};

// const fees = new Fees(2500, 10)
// console.log(fees.toConsoleString());
