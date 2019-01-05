const ChainUtil = require("./chain-util");

let list = [];
for (let i = 0; i < 10; i++) {
  list.push(
    ChainUtil.genKeyPair()
      .getPublic()
      .encode("hex")
  );
}
console.log(list);
list.sort((a, b) => {
  return a < b ? -1 : 1;
});
console.log(list);
