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
   paths: {
    sources: "./backend/contracts",
    tests: "./backend/test",
    cache: "./backend/cache",
    artifacts: "./backend/artifacts"
  },
  networks: {
    localhost: {
    url: "http://127.0.0.1:8545"
    },
    amoy: {
      url: "https://rpc-amoy.polygon.technology/", // Polygon Amoy RPC
      accounts: [process.env.PRIVATE_KEY], // your deployer wallet
    },
  },
};
