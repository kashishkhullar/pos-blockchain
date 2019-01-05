class Account {
  constructor() {
    this.addresses = ["stake-address", "validator-address"];
    this.balance = {};
  }

  initialize(address) {
    if (this.balance[address] == undefined) {
      this.balance[address] = 100;
      this.addresses.push(address);
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

  update(transaction) {
    let amount = transaction.output.amount;
    let from = transaction.input.from;
    let to = transaction.output.to;
    this.transfer(from, to, amount);
  }
}

module.exports = Account;
