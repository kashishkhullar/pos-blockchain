class Account {
  constructor() {
    this.balance = {};
  }

  initialize(address) {
    if (this.balance[address] == undefined) {
      this.balance[address] = 100;
    }
  }

  transfer(from, to, amount) {
    this.initialize(from);
    this.initialize(to);
    this.increment(to, amount);
    this.decrement(from, amount);
  }

  increment(to, amount) {
    this.balance[to] += amount;
  }

  decrement(from, amount) {
    this.balance[from] -= amount;
  }

  getBalance(address) {
    this.initialize(address);
    return this.balance[address];
  }
}

module.exports = Account;
