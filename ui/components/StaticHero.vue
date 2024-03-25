<template>
    <section class="mb-32 ">
      <div class="relative overflow-hidden bg-cover bg-no-repeat bg-[50%] bg-[url('https://mdbcdn.b-cdn.net/img/new/textures/full/154.jpg')] h-[500px]"></div>
      <div class="container mx-auto px-6 md:px-12 xl:px-32">
        <div class="text-center">
          <div
            class="mt-[-270px] block rounded-lg bg-slate-300/[0.55] bg-slate-200 /[0.7)] px-6 py-12 shadow-md backdrop-blur-[30px] dark:bg-black/[0.55] dark:shadow-black/20 md:py-16 md:px-12">
            <h1 class="mb-16 text-5xl font-bold tracking-tight md:text-6xl xl:text-7xl">
              “Fuel Our Creativity:  <br /><span class="text-red-600 dark:text-red-400">Support Us with a Virtual Cup of Crypto Coffee!”</span>
            </h1>
            <a class="mb-2 inline-block rounded bg-red-600 px-12 pt-4 pb-3.5 text-sm font-medium uppercase leading-normal text-white shadow-md transition duration-150 ease-in-out hover:bg-red-600 hover:shadow-md focus:bg-red-600 focus:shadow-[0_8px_9px_-4px_rgba(220,76,100,0.3),0_4px_18px_0_rgba(220,76,100,0.2)] focus:outline-none focus:ring-0 active:bg-red-700 active:shadow-md dark:shadow-md dark:hover:shadow-md dark:focus:shadow-md dark:active:shadow-md md:mr-2 md:mb-0"
              data-te-ripple-init data-te-ripple-color="light" href="#!" role="button" @click="buy()">Buy Me Coffee</a>
            <a class="inline-block rounded px-12 pt-4 pb-3.5 text-sm font-medium uppercase leading-normal text-red-600 transition duration-150 ease-in-out hover:bg-neutral-500 hover:bg-opacity-10 hover:text-red-600 focus:text-red-600 focus:outline-none focus:ring-0 active:text-red-700 dark:hover:bg-neutral-700 dark:hover:bg-opacity-40"
              data-te-ripple-init data-te-ripple-color="light" href="#!" role="button">Learn more</a>
          </div>
        </div>
      </div>
    </section>
</template>

<script lang="ts" setup>

  import {ethers} from  'ethers'
  import BuyMeCoffeeJson from '../artifacts/contracts/BuyMeCoffee.sol/BuyMeCoffee.json';
  const abi = BuyMeCoffeeJson.abi;
  const config =  await useRuntimeConfig()
  const { provider, currentAccount, checkIfWalletExists, connectWallet } = useEthers()
  const  emit  = defineEmits(['connect'])

  let _provider: any  = null
  let buyMeCoffee: any = null

  watch([currentAccount, _provider], async () => {
    if (!currentAccount.value || !_provider){
       buyMeCoffee = await BuyMeCoffee()
      //await BuyMeCoffee()
    }
  },{ deep: true})

  const BuyMeCoffee = async () => {
    try {
      _provider = new ethers.BrowserProvider(provider.value)
      console.log("_provider.value >>>> ", await _provider)
      const network = await _provider.getNetwork()
      const chainId = network.chainId
      console.log("chainIde >>>> ", chainId)
      //let signer = await _provider.getSigner()
      //console.log("signer >>>> ", await signer)
      return new ethers.Contract(
        config.public.contractAddress,
        abi,
        _provider
      )
    } catch(e){
        console.error('Failed to load contract >>', e);
    }
  }
  
  const buy = async () => {
    console.log("Current Account >>>> ", currentAccount.value)
    try {
      if (!currentAccount?.value || !await checkIfWalletExists()) {
        emit('connect')
        console.log("Shuold open Modal")
        return
      } else {
        let signer = await _provider.getSigner()
        let overrides = {
          value: ethers.parseUnits('1.0', 'ether'),
        }
        const tx = await buyMeCoffee.connect(signer).buy(overrides);
        await tx.wait();
      }
    } catch (err) {
      console.log('Error!', err)
    }
  };

</script>

<style>

</style>