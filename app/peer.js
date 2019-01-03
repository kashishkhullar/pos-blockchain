class Peer {
  constructor(blockchain, p2pserver, wallet, transactionPool) {
    this.blockchain = blockchain;
    this.p2pserver = p2pserver;
    this.wallet = wallet;
    this.transactionPool = transactionPool;
  }
}
