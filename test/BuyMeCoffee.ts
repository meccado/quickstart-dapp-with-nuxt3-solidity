import { expect } from "chai";

describe('Buy Me Coffee Contract', () => {
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
      transaction = await buyMeCoffee.connect(buyer1).buy({ value: ethers.parseUnits('1.0', 'ether')});
      await transaction.wait()
    })

    it('Should have balance > zero', async()=>{
        // use call function to getBalance() using owner's address
      const balance = await buyMeCoffee.connect(owner).getBalance()
      //await balance.wait()
        
        console.log(`Balance of ${await buyMeCoffee.getAddress()} is ${ethers.formatEther(balance)}`);
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
        
      console.log(`Balance of ${await buyMeCoffee.getAddress()} is ${ethers.formatEther(balance)}`);
      expect(balance).to.be.equal(0);
    })
  })
})
