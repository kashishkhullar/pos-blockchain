class Validators {
  constructor() {
    this.list = [
      "5aad9b5e21f63955e8840e8b954926c60e0e2d906fdbc0ce1e3afe249a67f614"
    ];
  }

  update(transaction) {
    console.log(transaction);
    if (transaction.output.amount >= 25 && transaction.output.to == "0") {
      this.list.push(transaction.input.from);
      console.log("New Validator:", transaction.input.from);
      return true;
    }
    return false;
  }
}

module.exports = Validators;
