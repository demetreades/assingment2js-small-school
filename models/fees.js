const _amount         = new WeakMap();
const _discount       = new WeakMap();
const _discountAmount = new WeakMap();
const _total          = new WeakMap();

class Fees {
  constructor(amount, discount) {
    this.amount = amount;
    this.discount = discount;
    this.discountAmount = amount * (this.discount / 100);
    this.total = amount - this.discountAmount;
  }

  get amount() {
    return _amount.get(this);
  }

  set amount(value) {
    if (isNaN(value) || value < 1) {
      throw new Error(`Invalid tuition fees amount`);
    }
    _amount.set(this,value);
  }
  
  get discount() {
    return _discount.get(this);
  }

  set discount(value) {
    if (isNaN(value) || value > 100 || value < 0) {
      throw new Error(`Invalid discount rate, ( range: 0 - 100% )`);
    }
    _discount.set(this, value);
  }

  get discountAmount() {
    return _discountAmount.get(this);
  }

  set discountAmount(value) {
    if (isNaN(value) || value < 0) {
      throw new Error(`Invalid discount Amount`);
    }
    _discountAmount.set(this, value);
  }

  get total() {
    return _total.get(this);
  }
  
  set total(value) {
    if (isNaN(value) || value < 0) {
      throw new Error(`Invalid tuition total fees`);
    }
    _total.set(this, value);
  }
  
  toConsoleString = () => {
    return (
      `Tuition fees   -   details:

      Starting amount:  ${this.amount}€
      Discount rate:    ${this.discount}%
      Discount amount:  ${this.discountAmount}€
      -----------------------
      Total fees:       ${this.total}€`
    );
  }
};

const fees = new Fees(2500, 10)
console.log(fees.toConsoleString());

module.exports = { Fees };
