const Block = require("./block");
const Stake = require("./stake");
const Account = require("./account");
const Validators = require("./validators");

const TRANSACTION_TYPE = {
  transaction: "TRANSACTION",
  stake: "STAKE",
  validator_fee: "VALIDATOR_FEE"
};

class Blockchain {
  constructor() {
    this.chain = [Block.genesis()];
    this.stakes = new Stake();
    this.accounts = new Account();
    this.validators = new Validators();
  }

  addBlock(block) {
    this.chain.push(block);
    console.log("NEW BLOCK ADDED");
    return block;
  }

  createBlock(transactions) {
    const block = Block.createBlock(
      this.chain[this.chain.length - 1],
      transactions
    );
    return block;
  }

  isValidChain(chain) {
    if (JSON.stringify(chain[0]) !== JSON.stringify(Block.genesis()))
      return false;

    for (let i = 1; i < chain.length; i++) {
      const block = chain[i];
      const lastBlock = chain[i - 1];
      if (
        block.lastHash !== lastBlock.hash ||
        block.hash !== Block.blockHash(block)
      )
        return false;
    }

    return true;
  }

  replaceChain(newChain) {
    if (newChain.length <= this.chain.length) {
      console.log("Recieved chain is not longer than the current chain");
      return;
    } else if (!this.isValidChain(newChain)) {
      console.log("Recieved chain is invalid");
      return;
    }

    console.log("Replacing the current chain with new chain");
    this.executeChain(newChain);
    this.chain = newChain;
  }

  getBalance(publicKey) {
    return this.accounts.getBalance(publicKey);
  }

  getLeader() {
    return this.stakes.getMax();
  }

  initialize(address) {
    this.accounts.initialize(address);
    this.stakes.initialize(address);
  }

  isValidBlock(block) {
    const lastBlock = this.chain[this.chain.length - 1];
    if (
      block.lastHash !== lastBlock.hash ||
      block.hash !== Block.blockHash(block)
    ) {
      return false;
    } else {
      return true;
    }
  }

  executeTransactions(block) {
    block.data.forEach(transaction => {
      switch (transaction.type) {
        case TRANSACTION_TYPE.transaction:
          this.accounts.update(transaction);
          break;
        case TRANSACTION_TYPE.stake:
          this.stakes.update(transaction);
          break;
        case TRANSACTION_TYPE.validator_fee:
          this.validators.update(transaction);
          break;
      }
    });
  }

  executeChain(chain) {
    chain.forEach(block => {
      this.executeTransactions(block);
    });
  }
}

module.exports = Blockchain;
