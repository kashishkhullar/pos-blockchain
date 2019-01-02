const ChainUtil = require("../chain-util");
const Transaction = require("./transaction");

class Wallet {
  constructor() {
    this.balance = null;
    this.keyPair = ChainUtil.genKeyPair();
    this.publicKey = this.keyPair.getPublic().encode("hex");
  }

  toString() {
    return `Wallet - 
        publicKey: ${this.publicKey.toString()}
        balance  : ${this.balance}`;
  }

  sign(dataHash) {
    return this.keyPair.sign(dataHash);
  }

  createTransaction(to, amount, blockchain, transactionPool) {
    this.balance = this.getBalance(blockchain);

    if (amount > this.balance) {
      console.log(
        `Amount: ${amount} exceeds the current balance: ${this.balance}`
      );
      return;
    }

    let transaction = Transaction.newTransaction(this, to, amount);
    transactionPool.addTransaction(transaction);

    return transaction;
  }

  getBalance(blockchain) {
    return blockchain.getBalance(this.publicKey);
  }
}

module.exports = Wallet;
