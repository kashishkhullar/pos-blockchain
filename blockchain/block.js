const SHA256 = require("crypto-js/sha256");

class Block {
  constructor(timestamp, lastHash, hash, data) {
    this.timestamp = timestamp;
    this.lastHash = lastHash;
    this.hash = hash;
    this.data = data;
  }

  toString() {
    return `Block - 
        Timestamp : ${this.timestamp}
        Last Hash : ${this.lastHash}
        Hash      : ${this.hash}
        Data      : ${this.data}`;
  }

  static genesis() {
    return new this(`genesis time`, "----", "genesis-hash", []);
  }

  static createBlock(lastBlock, data) {
    let hash;
    let timestamp = Date.now();
    const lastHash = lastBlock.hash;
    hash = Block.hash(timestamp, lastHash, data);
    return new this(timestamp, lastHash, hash, data);
  }

  static hash(timestamp, lastHash, data) {
    return SHA256(JSON.stringify(`${timestamp}${lastHash}${data}`)).toString();
  }

  static blockHash(block) {
    const { timestamp, lastHash, data } = block;
    return Block.hash(timestamp, lastHash, data);
  }
}

module.exports = Block;
