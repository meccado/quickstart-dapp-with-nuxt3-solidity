import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import * as dotenv from 'dotenv';
import path from 'path'
dotenv.config({ 
  path: path.resolve(__dirname, '.env') 
});

const { PRIVATE_KEY, ROPSTEN_ALCHEMY_RPC_URL, HARDHAT_RPC_URL } = process.env


const config: HardhatUserConfig = {
  solidity: "0.8.24",
  networks: {
    localhost: { url: HARDHAT_RPC_URL },
    // Ropsten is used for testing purposes
    // ropsten: {
    //   url: ROPSTEN_ALCHEMY_RPC_URL,
    //   accounts: PRIVATE_KEY,
    // },
  },
  paths: {
    artifacts: "./ui/artifacts"
  },
};

export default config;
