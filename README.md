# Predictron - the future of prediction based entertainment on TRON!

# OLD:
# Peer to Peer Sports Betting Dapp

![Landing Page](https://github.com/jeremyzhang1/peer-sports-betting/blob/main/src/utils/LandingPage.PNG?raw=true)

![App Page](https://github.com/jeremyzhang1/peer-sports-betting/blob/main/src/utils/AppPage.PNG?raw=true)

To run the dapp on the web, go to https://blockchain-bball.web.app.

To view the video demo, go to https://youtu.be/dYdrdbDB2s0.

To view slides, go to PredicTRON - tron Hackathon Presentation.pdf.

You will need to connect a MetaMask wallet and connect it to the tron testnet. [Here](https://docs.tron.one/home/network/wallets/browser-extensions-wallets/metamask-wallet) are some instructions from tron that can get you started.

You will need to use a TRONLink wallet and connect it to the TRONLink Nile testnet. Go to [TRON documenation](https://developers.tron.network/docs/build-a-web3-app#install) and follow the instructions to install the TRONLink extension. Then, create a wallet on TRONLink and connect your wallet to the Nile testnet, so you can use our website with TRON.

## About
Contract address: [0x8d3f00cabc107d969b09aac7373fced190f42510](https://explorer.pops.one/address/0x8d3f00cabc107d969b09aac7373fced190f42510)

A project for the [tron University Hackathon](https://taikai.network/en/tronprotocol/hackathons/hackthefuture/overview).

Made with ❤ by Jeremy ([@jeremyzhang01](https://twitter.com/jeremyzhang01)), Albert ([@AlbertWZhang](https://twitter.com/AlbertWZhang)), Charles ([@charlesma_20](https://twitter.com/charlesma_20)), and Ash ([@ashlan_ahmed](https://twitter.com/ashlan_ahmed))

## Testnet Deployment Setup
Go to https://developers.tron.network/docs/build-a-web3-app#install and follow the instructions to install TRONLink extension. Then, create a wallet on TRONLink so you can use our website with TRON. To test it, you can connect your wallet to the Nile testnet.

 Run `npm install tronweb` 


First, create a file called `.env` to store the mnemonic.

Then, run the command `npx mnemonic` in the terminal to generate a mnemonic. Copy and paste this into `.env`, so that it now has one line in the form
```
MNEMONIC = 'a lot of words go here'
```
Then, you want to figure out what the wallet addresses are based on your given mnemonic. To do so, run `truffle console --network tron_testnet`

Once the truffle development console prompt displays, run `accounts`, which will display a list of accounts. Make note of the first account, and the fact that it begins with `0x`. Take this account address and put it in the search bar [here](https://explorer.pops.one/) to get the equivalent tron ONE address, which begins with `one1`. Go to the tron ONE faucet [here](https://faucet.pops.one/) and paste in the tron ONE address and request test tokens.

Now that your account has test tokens, you can deploy the smart contracts. To deploy the smart contracts, run `truffle migrate --reset --network tron_testnet`

This project uses [Truffle](https://trufflesuite.com/truffle/)

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).
