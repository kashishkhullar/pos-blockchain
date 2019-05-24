const Block = require("./block");
const Wallet = require("../wallet/wallet");
let secret = "i am the first leader";
describe("Block", () => {
  let data, lastBlock, block;
  let wallet;
  beforeEach(() => {
    data = "bar";
    lastBlock = Block.genesis();
    wallet = new Wallet(secret);
    block = Block.createBlock(lastBlock, data, wallet);
  });

  it("sets the data to match the input", () => {
    expect(block.data[0]).toEqual(data);
  });

  it("sets the `lastHash` to match the hash of the last block", () => {
    expect(block.lastHash).toEqual(lastBlock.hash);
  });
});
