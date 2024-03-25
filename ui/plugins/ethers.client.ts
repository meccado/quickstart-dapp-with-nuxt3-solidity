import { ethers } from "ethers";
import { ref } from "vue"

export default defineNuxtPlugin((nuxtApp) => {

    const provider = ref(null)
    const currentAccount  = ref('')
    const { ethereum } = window as any

    ethereum.on('accountsChanged', async () => {
        const accounts = await ethereum.request({ method: 'eth_requestAccounts'})
        let account =  await ethers.getAddress(accounts[0])
        //let account =  await ethers.utils.getAddress(accounts[0])
        console.log("Account changed to ", account);
        currentAccount.value = account
     })

    const checkIfWalletExists = async () => {
        try {

            if (ethereum && ethereum.isMetaMask) {
                provider.value = ethereum
                console.log("Metamask is installed")
                return true
            } else {
                console.log('Metamask is not installed')
                return false
            }
        } catch (e) {
            console.error("Oops, something went wrong! ", e)
            return false
        }
    }

    const connectWallet = async () => {
        try {
            // Check if Meta Mask is installed
            if (!await checkIfWalletExists()) return;

            // Ask user to connect to Meta Mask
            const accounts = await provider.value?.request({ method: "eth_requestAccounts" });
  
            if (accounts == null || accounts.length === 0) {
                throw new Error("No connected accounts found");
            }
            let account = await ethers.getAddress(accounts[0])
            //let account =  await new ethers.utils.getAddress(accounts[0])
            currentAccount.value = account;
        } catch (ex) {
            console.log("Failed to connect", ex);
        }
    };

    nuxtApp.provide('ethers', {
        ...ethers,
        provider,
        currentAccount,
        checkIfWalletExists,
        connectWallet
    })
})