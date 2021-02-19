# Harmony NFT Marketplace Contract

## Development

- Install [node.js](https://nodejs.org/), npm and truffle
- Install dependencies :
  ```
  npm install
  npm install -g truffle
  ```
- Rename `.env.sample` to `.env` and change information with your own private key
- Compile the contracts:
  ```
  npm run compile
  ```
- Deploy the contracts:

1. Deploy to the testnet

```
npm run deploy:testnet
```

2. Deploy to the mainnet

```
npm run deploy:mainnet
```

This project is using Solc 0.6.12 as it's a most stable version.

## Contracts

- ExchangeV1.sol - Main Contract for exchange
- DavinciToken - HRC721 Token
- DavinciMultipleToken - HRC1155 TOken
