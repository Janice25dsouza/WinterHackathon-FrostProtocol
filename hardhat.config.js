require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config(); // to use .env for your private key

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: {
    version: "0.8.28",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200, // balances gas cost & deployment efficiency
      },
    },
  },
  networks: {
    amoy: {
      url: "https://rpc-amoy.polygon.technology/", // Polygon Amoy RPC
      accounts: [process.env.PRIVATE_KEY], // your deployer wallet
    },
  },
};
