<script lang="ts" setup>
 // Mobile menu button
 import { ref } from 'vue';

 const { currentAccount, connectWallet } = useEthers()


 const brandname = ref('BUY ME COFFEE')
 const color = ref('after:bg-red-500')
 const showMenu = ref(false);

 const links = [
  { name: "Home", icon: 'basil:home-solid', url: '/'},
  { name: "About Us", icon: 'material-symbols:info', url: '/about'},
  { name: "Contact Us", icon: 'basil:envelope-solid', url: '/contact'},
 ]


</script>

<template>
  <ClientOnly>
    <header class="max-w-7xl mx-auto shadow-sm shadow-slate-200 dark:shadow-slate-800 z-20"><!--sticky top-0 z-30-->
      <nav class="flex flex-col md:flex-row md:items-center md:justify-between h-16 min-w-full bg-transparent ">
        
        <div class="flex flux-col md:flex-row justify-between items-center min-h-full px-4">
          <!-- Logo -->
          <div class="text-lg uppercase font-semibold -tracking-wider ">
              <NuxtLink to="#">
                <Icon name="ph:coffee-light" size="48" class="text-red-500 font-semibold pr-2 animate-bounce transition duration-1000" />
                <span>{{ brandname }}</span>
              </NuxtLink>
          </div>
          <!-- Mobile menu button -->
          <dev class="md:hidden z-30" @click="showMenu = !showMenu" type="button" aria-label:aria-expanded="showMenu ? 'true' : 'false'">
            <span class="sr-only">Open main menu</span>
            <!-- Heroicon name: outline/menu -->
            <Icon name="basil:menu-solid" v-if="!showMenu" class="h-6 w-6 text-gray-900 dark:text-slate-200" />
            <!-- Heroicon name: solid/x -->
            <Icon name="basil:cross-solid" v-else class="h-6 w-6 text-gray-900 dark:text-slate-200" />
          </dev>
        </div>

        <!-- Menu  :class="showMenu === true ? 'left-0' : 'translate-x-[-100%]'-->
        <div :class="showMenu === true ? 'block' : 'hidden'" class="md:flex items-center tran transition duration-700 ease-in-out md:static md:h-16 absolute shadow-md bg-white dark:bg-gray-800 md:dark:bg-transparent dark:shadow-none md:shadow-none md:bg-inherit left-0 top-[4rem] min-w-full md:min-w-fit z-30">
          <ul class="flex flex-col justify-end md:items-center md:flex-row md:min-h-full py-2 px-4">
            <li v-for="link in links" :key="link.name" class="hover:bg-gray-200 dark:hover:bg-slate-800 py-4 px-2 rounded-lg focus:shadow-outline md:border-0 border-b-2 border-slate-800 dark:border-slate-400">
              <NuxtLink class=" flex items-center font-semibold" :to="link.url">
                <Icon :name="link.icon" class="text-red-500"  size="24"/>
                <span class="text-nowrap ml-2">{{ link.name}}</span>
              </NuxtLink>
            </li>
            <button @click="connectWallet()" class="w-full py-3 px-4 tracking-wide transition-all duration-300 ease-in-out bg-transparent  hover:bg-gray-200 dark:hover:bg-slate-800 dark:bg-transparent rounded-lg focus:shadow-outline">
              <Icon name="material-symbols:account-balance-wallet" size="24" class="text-red-500"/>
              <span v-if="!currentAccount" class="ml-2 text-nowrap font-semibold">Connect</span>
              <span v-else class="ml-2 text-nowrap">{{ `${ currentAccount.slice(0,6)}...${currentAccount.slice(38,42)}` }}</span>
            </button>
            <SwitchButton :color="color"/>
          </ul>
        </div>

      </nav>
        
    </header>
  </ClientOnly>
</template>

<style>

</style>
