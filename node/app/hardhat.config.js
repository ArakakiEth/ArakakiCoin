const dotenv = require("dotenv").config();

require("@nomiclabs/hardhat-waffle");

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

module.exports = {
  solidity: "0.8.4",
  networks: {
    localhost: {
      url: "http://localhost:8545",
      chainId: 31337,
    },
    shibuya: {
      url: "https://rpc.shibuya.astar.network:8545",
      chainId: 81,
      accounts: [
        process.env.ACCOUNT_PRIVATE_KEY,
      ],
    },
    shiden: {
      url: "https://rpc.shiden.astar.network:8545",
      chainId: 336,
      accounts: [
        process.env.ACCOUNT_PRIVATE_KEY,
      ],
    },
    astar: {
      url: "https://rpc.astar.network:8545",
      chainId: 592,
      accounts: [
        process.env.ACCOUNT_PRIVATE_KEY,
      ],
    },
  },
};

