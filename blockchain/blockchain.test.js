const Blockchain = require("./blockchain");
const Block = require("./block");
const Wallet = require("../wallet/wallet");

describe("Blockchain", () => {
  let blockchain, blockchain2;

  let secret = "i am the first leader";

  beforeEach(() => {
    blockchain = new Blockchain();
    blockchain2 = new Blockchain();
  });

  it("starts with the genesis block", () => {
    expect(blockchain.chain[0]).toEqual(Block.genesis());
  });

  it("adds a new block", () => {
    const data = "foo";

    blockchain.addBlock(data);
    expect(blockchain.chain[blockchain.chain.length - 1].data[0]).toEqual(data);
  });

  it("validates a valid chain", () => {
    const data = "foo";

    blockchain2.addBlock(data);
    // conventional method for check true and false is toBe

    expect(blockchain2.isValidChain(blockchain2.chain)).toBe(true);
  });

  it("invalidates a chain with a corrupt the genesis block", () => {
    blockchain2.chain[0].data = "bad data";

    expect(blockchain.isValidChain(blockchain2.chain)).toBe(false);
  });

  it("invalidates a corrput chain", () => {
    blockchain2.addBlock("foo");
    blockchain2.chain[1].data = "not foo";

    expect(blockchain.isValidChain(blockchain2.chain)).toBe(false);
  });

  it("replaces the chain with a valid chain", () => {
    blockchain2.addBlock("goo");
    blockchain.replaceChain(blockchain2.chain);
    expect(blockchain.chain).toEqual(blockchain2.chain);
  });

  it("does not replaces the chain with a one with less than or equal to chain", () => {
    blockchain.addBlock("foo");
    blockchain.replaceChain(blockchain2.chain);
    expect(blockchain.chain).not.toEqual(blockchain2.chain);
  });

  /*
   */
});
