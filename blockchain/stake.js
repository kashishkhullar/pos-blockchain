class Stake {
  constructor() {
    this.addresses = [];
    this.balance = {};
  }

  initialize(address) {
    if (this.balance[address] == undefined) {
      this.balance[address] = 0;
      this.addresses.push(address);
    }
  }

  // transfer(from, to, amount) {
  //   this.initialize(from);
  //   this.initialize(to);
  //   this.increment(to, amount);
  //   this.decrement(from, amount);
  // }

  // increment(to, amount) {
  //   this.balance[to] += amount;
  // }

  // decrement(from, amount) {
  //   this.balance[from] -= amount;
  // }

  addStake(from, amount) {
    this.initialize(from);
    this.balance[from] += amount;
  }

  getBalance(address) {
    this.initialize(address);
    return this.balance[address];
  }

  getMax() {
    let balance = 0;
    let leader = undefined;
    this.addresses.forEach(address => {
      if (this.getBalance(address) > balance) {
        leader = address;
      }
    });
    return leader;
  }

  update(transaction) {
    let amount = transaction.output.amount;
    let from = transaction.input.from;
    this.addStake(from, amount);
  }
}

module.exports = Stake;
