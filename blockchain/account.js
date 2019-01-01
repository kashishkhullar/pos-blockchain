class Account {
  constructor() {
    this.balance = {};
  }

  transfer(from, to, amount) {
    this.increment(to, amount);
    this.decrement(from, amount);
  }

  increment(to, amount) {
    this.balance[to] += amount;
  }
  decrement(from, amount) {
    this.balance[from] -= amount;
  }
}

module.exports = Account;
