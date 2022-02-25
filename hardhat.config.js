require("@nomiclabs/hardhat-waffle");
require('@openzeppelin/hardhat-upgrades');
require("@nomiclabs/hardhat-etherscan");

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

/**
 * @type import('hardhat/config').HardhatUserConfig
 */

secrets = require('./scripts/secrets');
module.exports = {
  solidity: "0.8.4",
  networks: {
    ropsten: {
      url: `https://ropsten.infura.io/v3/287b06b76784416b9f230b04235de663`,
      accounts: [`${secrets.ROPSTEN_PRIVATE_KEY}`]
    },
    ftmTestnet: {
      url: `https://rpc.testnet.fantom.network/`,
      accounts: [`${secrets.ROPSTEN_PRIVATE_KEY}`],
      chainId: 0xfa2,
    },
    ftm: {
      url: `https://rpcapi.fantom.network`,
      accounts: [`${secrets.FANTOM_MAINNNET_KEY}`],
      chainId: 250,
    }
  },
  etherscan: {
    // Your API key for Etherscan
    // Obtain one at https://etherscan.io/
    apiKey: {
      ropsten: "HJ8MIS1E84VWP8BH5P8D14HDATYS2XGIJZ",
      ftmTestnet: "F3JMSIZ28TUXYQJVS3CQDNWAXWWQ9CQBJ8",
    }
  },
  ftmscan: {
    apiKey: "F3JMSIZ28TUXYQJVS3CQDNWAXWWQ9CQBJ8"
  }
};
