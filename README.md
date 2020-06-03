# Proof Of Stake Blockchain
This project is a proof of concept of proof of stake algorithm used in Ethereum 2.0

## Accompaining Article and Tutorial
https://medium.com/coinmonks/implementing-proof-of-stake-e26fa5fb8716

## API Reference

### Nodes

#### POST /transact
Send transactions

##### Body `json`
```json
{
    "to":"Address",
    "amount":Number,
    "type": "TRANSACTION" | "STAKE" | "VALIDATOR_FEE"
}
```

#### GET /transactions
Returns the content of the transaction pool

#### GET /public-key
Returns the public-key of the node

#### GET /balance
Returns the balance of the node

### ICO

Add prefix `/ico` before Nodes APIs for ICO's APIs

## Start system

1. Run a few nodes with different HTTP and Socket Ports
    
    1st Node
    ```
    HTTP_PORT=3001 P2P_PORT=5001 npm run dev
    ```
    2nd Node - add the 1st node as peer
    ```
    HTTP_PORT=3002 P2P_PORT=5002 PEERS=wc://localhost:5001 npm run dev
    ```

    3rd Node - add the 1st and 2nd node as peer
    ```
    HTTP_PORT=3003 P2P_PORT=5003 PEERS=wc://localhost:5001,wc://localhost:5002 npm run dev
    ```

2. Initial they all have zero balance. Run an ICO and send then some coins. You may or may not add all of the nodes but atleast add one.

    ```
    PEERS=wc://localhost:5001,wc://localhost:5002,wc://localhost:5003 npm run ico
    ```

3. Open Postman and call `localhost://3000/ico/transact` with the following in the body. Note intial balance of ICO is 1000. You can change that in config.js. Get the address of the all the nodes by calling
   ```json
   {
	"to":"e6ff899aabe0242e0c70441a8b28662d82284b8538d3f9fb6b11b3e9b1cad849",
	"amount":100,
	"type": "TRANSACTION"
   }
   ```

4. Do this 5 times, since 5 is set as the threshold for the transaction pool and can be changed in config.js. It is only when this threshold is hit, a block is generated.
5. Once the block is generated, check the balance of those nodes that you have sent coins too. They would get some less amount because the transaction fee is set to 1 coin in config.js
6. In the next round, send the validator fee and then send another trasanction to stake some coins if you want any node to be leader. Change the transaction type to `VALIDATOR_FEE` to send transaction for validator fee and `STAKE` to send trasnaction to stake coins.

    ```json
    {
        "to":"0",
        "amount":30,
        "type": "VALIDATOR_FEE"
    }
    ```
    ```json
    {
        "to":"0",
        "amount":30,
        "type": "STAKE"
    }
    ```
7. Default validator fee is set to 25 coins, sending extra would lose your coins wont be refunded.
8. It is important to first send validator fee transaction first and then send stake transaction since stake transaction will only increase your stake amount but to be considered for leader you need to send validator fee. Sending stake coins before wont lose your coins but won't make you leader.
9. By default ICO has `0` stake so that the smallest stake can change leadership
10. Now send normal transactions to other nodes
    ```json
    {
        "to":"your nodes address",
        "amount":10,
        "type": "TRANSACTION"
    }
    ```
11. Send stake transactions again to change the leader
12. Stop the ICO App when you're done.
