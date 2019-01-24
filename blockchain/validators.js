class Validators {
  constructor() {
    this.list = [
      "5aad9b5e21f63955e8840e8b954926c60e0e2d906fdbc0ce1e3afe249a67f614"
    ];
  }

  update(transaction) {
    if (transaction.amount == 30 && transaction.to == "0") {
      this.list.push(transaction.from);
      return true;
    }
    return false;
  }
}

module.exports = Validators;
