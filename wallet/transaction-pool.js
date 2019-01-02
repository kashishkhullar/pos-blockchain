const Transaction = require("./transaction");

class TransactionPool {
  constructor() {
    this.transactions = [];
  }

  addTransaction(transaction) {
    let transactionWithId = this.transactions.find(
      t => t.id === transaction.id
    );

    if (!transactionWithId) {
      this.transactions.push(transaction);
    }
  }

  validTransactions() {
    return this.transactions.filter(transaction => {
      if (!Transaction.verifyTransaction(transaction)) {
        console.log(`Invalid signature from ${transaction.data.from}`);
        return;
      }

      return transaction;
    });
  }

  clear() {
    this.transactions = [];
  }
}

module.exports = TransactionPool;
