DAPP for playing with the EthereumExplorer class
================================================

This is a simple DAPP for playing with the `EthereumExplorer`. In this project you can find several example for using the `EthereumExplorer` class.

In this project you can find the smart contracts and the DApp interface.

This project uses the Truffle framework. You can use any other framework (like HardHat) but you have to make as fix explained below.

You can find all the uses cases for the class `EthereumExplorer` in the file `app/src/index.js`.

<img src="https://github.com/danielefavi/ethereum-explorer-example/raw/master/.github/images/dapp-screenshot.png" width="100%" />

# Quick Start

Make sure that the blockchain in your local computer is running!

## Deploy the smart contract with Truffle

```sh
truffle console --network ganache
```

```sh
migrate --reset --compile-all
```

## Install Start the D-App

```sh
cd app && npm install
```

```sh
npm run start:dev
```

The dapp should be running at `http://localhost:9000/`.
