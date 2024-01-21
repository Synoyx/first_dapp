require("@nomicfoundation/hardhat-toolbox");
require("@openzeppelin/hardhat-upgrades");
const { vars } = require("hardhat/config");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.23",
  defaultNetwork: "sepolia",
  networks: {
    hardhat: {},
    sepolia: {
      url: vars.get("SEPOLIA_RPC_URL"),
      accounts: [vars.get("SEPOLIA_WALLET_PK")],
    },
  },
};
