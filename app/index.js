const express = require("express");
const Blockchain = require("../blockchain/blockchain");
const bodyParser = require("body-parser");
const P2pserver = require("./p2p-server");

const HTTP_PORT = process.env.HTTP_PORT || 3001;

const app = express();

app.use(bodyParser.json());

const blockchain = new Blockchain();
const p2pserver = new P2pserver(blockchain);

app.get("/blocks", (req, res) => {
  res.json(blockchain.chain);
});

app.post("/create", (req, res) => {
  const block = blockchain.addBlock(req.body.data);
  console.log(`New block added: ${block.toString()}`);
  p2pserver.syncChain();
  res.redirect("/blocks");
});

app.post("/transact", (req, res) => {
  const { to, from, amount } = req.body;
  res.json({ creating: "transaction" });
});

app.listen(HTTP_PORT, () => {
  console.log(`Listening on port ${HTTP_PORT}`);
});

p2pserver.listen();
