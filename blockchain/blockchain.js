const Block = require("./block");
const Stake = require("./stake");
const Account = require("./account");
const Validators = require("./validators");

class Blockchain {
  constructor() {
    this.chain = [Block.genesis()];
    this.stakes = new Stake();
    this.accounts = new Account();
    this.validators = new Validators();
  }

  addBlock(data) {
    const block = Block.createBlock(this.chain[this.chain.length - 1], data);
    this.chain.push(block);
    console.log("NEW BLOCK ADDED");
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
    this.chain = newChain;
  }

  getBalance(publicKey) {
    return this.accounts.getBalance(publicKey);
  }

  getLeader() {}
}

module.exports = Blockchain;
