const EC = require("elliptic").eddsa;
const ec = new EC("ed25519");

let key = ec.keyFromSecret("i am the first leader");
// let key2 = ec.keyFromSecret("i am the first leader");

// let pub = key.getPublic("hex");
let pub = "5aad9b5e21f63955e8840e8b954926c60e0e2d906fdbc0ce1e3afe249a67f614";
console.log(pub);

// let hash = "asdas";
let hash = "72bda1bffa38942f57bae6f4b81312682740c178f64aeec743139a91d20edbff";
// let signature = key.sign(hash).toHex();
let signature =
  "5A6806BF5B264B8B194D69F088FBD1FFEF734AF34C83379670E0F790377310DF30158B47B05679D8D0125CC19DB33EE4A3CB871C6A7B1877DBE161921DA96703";

console.log(signature);

// console.log(key.getPublic("hex"));
let key2 = ec.keyFromPublic(key.getPublic("hex"));
// // let signature2 = key2.sign(hash).toHex();
// console.log(key.getPrivate());
// // console.log(signature2);

// console.log(key.getPublic("hex") === key2.getPublic("hex"));
console.log(key2.verify(hash, signature));

describe("Test", () => {
  it("00 contain at least one test", () => {
    expect(1).toEqual(1);
  });
});
