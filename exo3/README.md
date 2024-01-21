# voting_contract_dapp

DApp for the voting contract of Alyra's course

USED NETWORK FOR DEPLOYING CONTRACT : SEPOLIA
https://hardhat.org/hardhat-runner/docs/guides/configuration-variables

Remember to fill your conf variable with hardhat :

- npx hardhat vars set SEPOLIA_RPC_URL
- npx hardhat vars set SEPOLIA_WALLET_PK

Command for deploying on sepolia : npx hardhat run scripts/deploy.js --network sepolia

To make front works, remember to run npm run build command the first time, then npm run dev to make it running
