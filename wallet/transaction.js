const ChainUtil = require("../chain-util");

class Transaction {
  constructor() {
    this.id = ChainUtil.id();
    this.input = null;
    this.output = null;
  }

  static newTransaction(senderWallet, to, amount) {
    if (amount > senderWallet.balance) {
      console.log(`Amount : ${amount} exceeds the balance`);
      return;
    }

    return Transaction.generateTransaction(senderWallet, to, amount);
  }

  static generateTransaction(senderWallet, to, amount) {
    const transaction = new this();
    transaction.output = {
      to: to,
      amount: amount
    };
    Transaction.signTransaction(transaction, senderWallet);
    return transaction;
  }

  static signTransaction(transaction, senderWallet) {
    transaction.input = {
      timestamp: Date.now(),
      from: senderWallet.publicKey,
      signature: senderWallet.sign(ChainUtil.hash(transaction.output))
    };
  }

  static verifyTransaction(transaction) {
    return ChainUtil.verifySignature(
      transaction.input.from,
      transaction.input.signature,
      ChainUtil.hash(transaction.output)
    );
  }
}

module.exports = Transaction;
