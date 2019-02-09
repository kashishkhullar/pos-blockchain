const ChainUtil = require("../chain-util");
const { TRANSACTION_FEE } = require("../config");

class Transaction {
  constructor() {
    this.id = ChainUtil.id();
    this.type = null;
    this.input = null;
    this.output = null;
  }

  static newTransaction(senderWallet, to, amount, type) {
    if (amount + TRANSACTION_FEE > senderWallet.balance) {
      console.log(`Amount : ${amount} exceeds the balance`);
      return;
    }

    return Transaction.generateTransaction(senderWallet, to, amount, type);
  }

  static generateTransaction(senderWallet, to, amount, type) {
    const transaction = new this();
    transaction.type = type;
    transaction.output = {
      to: to,
      amount: amount - TRANSACTION_FEE,
      fee: TRANSACTION_FEE
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
