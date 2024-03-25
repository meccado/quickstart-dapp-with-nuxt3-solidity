## CREATING "BUY ME COFFEE" SMART CONTRACT
#### _**Using Solidity, Hardhat & Nuxt 3**_

### Use Existing Project:


### Creating Project From Scratch:

### STEP: 1 - Working with Smart Contracts in the Ethereum

```ts
// # Initialize Node Project
pnpm init

//  # Install Dependencies 
pnpm i -D hardhat @nomicfoundation/hardhat-toolbox dotenv

// # initialize Solidity Contract with Hardhat
pnpm dlx hardhat init

// # Important Hardhat commands
pnpm hardhat [ compile | test | accounts | node ]

pnpm hardhat run  scripts/deploy.ts --network [localhost | ropsten | mainnet ]
```

#### Create .env file
```ts
// # Create .env file
touch .env

// # Update .env file
ROPSTEN_ALCHEMY_API_KEY=
ROPSTEN_ALCHEMY_RPC_URL=YOUR_ALCHEMY_URL 
PRIVATE_KEY=0x...
HARDHAT_RPC_URL=http://127.0.0.1:8545/
```

### Manually create a contract:
```ts 
// Initialize project structure if you not using initilizing hardhat, otherwise skip
mkdir contracts && mkdir test && mkdir scripts

// # Initialize nuxt3 project, we  will use it for frontend part of our app
mkdir ui
pnpm dlx nuxi@latest init ui\
cd ui

```
#### Create hardhat.config.ts
```ts
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
```

#### Create Solitidy contract
```ts
// # Create solidity contract
touch contracts/BuyMeCoffee.sol

// # Write your smart contract code in BuyMeCoffee.sol file

// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.24;

// Uncomment this line to use console.log
// import "hardhat/console.sol";

contract BuyMeCoffee {

    address payable public owner;

    event Withdrawal(uint amount, uint when);

    constructor() payable {
        owner = payable(msg.sender);
    }

    modifier onlyOwner {
       require(msg.sender == owner, "Only owner can perform this function!");
       _;
   }

    function getBalance() public view returns(uint) ownerOnly {
        return address(this).balance;
    }

    receive() external payable {}

    function buy() external payable {
        require(msg.value >= 1 ether, "At least one Ether needed to buy a coffee");
        //owner.balance  += msg.value; // Add the received value to the balance of the owner
    }

    function withdraw() public ownerOnly {
        emit Withdrawal(address(this).balance, block.timestamp);
        (bool success, ) = owner.call{ value: address(this).balance }("");
        require(success , "Failed to do withdrawal");
    }
}

pnpm hardhat compile
```

#### Test Contracts
```ts
// # Create test scripts
touch scripts/test.js

import { expect } from "chai";


describe('Buy Me Coffee Contract', () => {

  const converTokens = (n) => {
    return ethers.parseUnits(n.toString(), 'ether')
  }

  const formatEther = (n) => {
    return ethers.formatEther(n)
  }

  let buyMeCoffee;
  let owner, buyer1, buyer2, buyer3;

  before(async () => {
    [ owner, buyer1, buyer2, buyer3  ] = await ethers.getSigners();
    // Here we get the contract to deploy
    const BuyMeCoffee = await ethers.getContractFactory("BuyMeCoffee");
   
    // And we create the instance.
    buyMeCoffee = await BuyMeCoffee.deploy();
    await buyMeCoffee.waitForDeployment();

    console.log("Buy Me Coffee contract deployed at: ", await buyMeCoffee.getAddress());
  });

  describe('Deployment', async () => {
    it('Should set the owner', async () => {
      const contract_owner = await buyMeCoffee.owner();
      console.log(`Owner address is ${contract_owner}`);
      expect(contract_owner).to.equal(owner);
    })
  })

  describe('Transactions', async () => {
   
    let transaction;

    before(async () => {
      transaction = await buyMeCoffee.connect(buyer1).buy({ value: converTokens(1.0)});
      await transaction.wait()
    })

    it('Should have balance > zero', async()=>{
        // use call function to getBalance() using owner's address
      const balance = await buyMeCoffee.connect(owner).getBalance()
      //await balance.wait()
        
        console.log(`Balance of ${await buyMeCoffee.getAddress()} is ${formatEther(balance)}`);
        expect(balance).to.be.greaterThan(0);
    })

    it('Should emit event', async()=>{
      transaction = await buyMeCoffee.connect(owner).withdraw();
      await transaction.wait()

      expect(transaction).to.emit(buyMeCoffee, "Withdrawal")
    })

    it('Should have balance == zero', async()=>{

      // use call function to getBalance() using owner's address
      const balance = await buyMeCoffee.connect(owner).getBalance()
      //await balance.wait()
        
      console.log(`Balance of ${await buyMeCoffee.getAddress()} is ${formatEther(balance)}`);
      expect(balance).to.be.equal(0);
    })
  })
})

pnpm hardhat test
```

#### Deployment script
```ts
// # Create deplyment scripts
touch scripts/deploy.js

const main = async () => {

    // Here we get the contract to deploy
    const BuyMeCoffee = await ethers.getContractFactory("BuyMeCoffee")

    // And we create the instance.
    const buyMeCoffee = await BuyMeCoffee.deploy()
    await buyMeCoffee.waitForDeployment()

    console.log("Deployed contract address is", await buyMeCoffee.getAddress())
}

main()
.then(() => process.exit(0))
.catch((error) => {
    console.error(error)
    process.exit(1)
})

pnpm hardhat run  scripts/deploy.ts --network localhost
```

### STEP: 2 - Working with FRONT-END
```ts
// # Change directory to client folder
cd ui

// # Add Tailwind Module
pnpm dlx nuxi@latest module add @nuxtjs/tailwindcss

pnpm dlx tailwindcss init --ts

// # create tailwind.css
touch ./assets/css/tailwind.css

// # Update tailwind.css
@tailwind base;
@tailwind components;
@tailwind utilities;
@layer base {
    body {
        @apply min-h-screen bg-slate-700 text-green-600 dark:bg-black dark:text-slate-4000
    }
}

// # Add Nuxt Icon Module
pnpm dlx nuxi@latest module add nuxt-icon

pnpm dlx nuxi@latest module add @nuxtjs/color-mode

// add darkMode to nuxt.config.ts
colorMode: {
  classSuffix: '',
}

// add darkMode to tailwind.config.ts
darkMode: 'class',
```

```ts
// # Install ethers for connecting wallets
pnpm i -D ethers

// # Create Nuxt plugin to  handle the Ethers.js instance globally
mkdir plugins && touch plugins/ethers.client.ts

import { ethers } from 'ethers'
import { ref } from 'vue'

export default defineNuxtPlugin((nuxtApp) => {
  const provider = ref<any>()
  const signer = ref<any>()

  if (process.client) {
    // Checking if user has metamask installed and is connected.
    const checkMetamask = async () => {
      // Create a new provider
      const providerOptions = window['ethereum']
      if (!providerOptions || !providerOptions.isMetaMask) return false

      // Set Provider
      provider.value = new providers.Web3Provider(window['ethereum'], 'any')

      // Get Signer
      try {
        signer.value = await provider.value!.getSigner()
      } catch (error) {
        console.log('Error getting Metamask account: ', error)
      }

      return true
    }

    nuxtApp.provide('checkMetamask', checkMetamask)
    nuxtApp.provide('signer', signer)
    nuxtApp.provide('provider', provider)
  } else {
    // Server-side setup of provider using Infura as RPC endpoint.
    provider.value = new providers.JsonRpcProvider('https://rpc-mainnet.maticvigil.com/')
  }
})


```

### Interact with the contract
```ts
import { ethers } from 'ethers'

const contractAddress = 0x...
const contractABI = []
const { ethereum } = window;  
const provider  = await new ethers.providers.Web3Provider(ethereum);
let signer = await provider.getSigner();
const buyMeCoffee = await new ethers.Contract(contractAddress, contractABI , signer)
```

```ts 
// # Configure Alchemy Mumbai Provider with ethers
import contract from '../artifact/contracts/BuyMeCoffee.json'
const [ALCHEMY_API_KEY, PRIVATE_KEY, CONTRACT_ADDRESS] = process.env
const main = async () => {
  const alchemy = await hre.ethers.providers.AlchemyProvider( 'maticmum', ALCHEMY_API_KEY );
  const wallet = await  hre.ethers.Wallet(PRIVATE_KEY , alchemy);
  const BuyMeCoffee = await hre.ethers.Contract(CONTRACT_ADDRESS , contract.abi, wallet);
}

main()
.then(() => process.exit(0))
.catch((error) => {
    console.error(error)
    process.exit(1)
})
```