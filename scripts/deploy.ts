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