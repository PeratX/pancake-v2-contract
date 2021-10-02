import { config } from 'dotenv'
import { task, HardhatUserConfig } from "hardhat/config";

config()

import "@nomiclabs/hardhat-waffle"
import '@typechain/hardhat'
import '@nomiclabs/hardhat-ethers'
import "hardhat-gas-reporter";
import 'hardhat-deploy'
import "@atixlabs/hardhat-time-n-mine";
import 'solidity-coverage';
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

export default {
  namedAccounts: {
    deployer: {
      default: 0
    },
    feeReceiver: {
      default: 1
    },
    box: {
      default: 2
    }
  },
  solidity: {
    compilers: [
      {
        version: '0.5.16',
        settings: {
          optimizer: {
            enabled: true,
            runs: 99999,
          },
        },
      },
      {
        version: '0.6.6',
        settings: {
          optimizer: {
            enabled: true,
            runs: 9999,
          },
        },
      }
    ]
  },
  networks: {
    hardhat: {
      initialBaseFeePerGas: 0, // workaround from https://github.com/sc-forks/solidity-coverage/issues/652#issuecomment-896330136 . Remove when that issue is closed.
      tags: ['local'],
      gas: 8000000,
      blockGasLimit: 8000000,
      allowUnlimitedContractSize: false,
      timeout: 1800000
    },
    localbsc: {
      url: "http://localhost:8545",
      timeout: 1800000
    },
    localavax: {
      url: "http://localhost:8546",
      timeout: 1800000
    },
    ropsten: {
      url: process.env.ROPSTEN_URL || "",
      accounts:
        process.env.PRIVATE_KEY !== undefined ? [process.env.PRIVATE_KEY] : [],
    },
    avax: {
      url: process.env.AVAX_RPC || "",
      accounts:
        process.env.PRIVATE_KEY !== undefined ? [process.env.PRIVATE_KEY] : [],
    },
    bsc: {
      url: process.env.BSC_RPC || "",
      accounts:
        process.env.PRIVATE_KEY !== undefined ? [process.env.PRIVATE_KEY] : [],
    },
  },
  gasReporter: {
    enabled: process.env.REPORT_GAS !== undefined,
  },
} as HardhatUserConfig;
