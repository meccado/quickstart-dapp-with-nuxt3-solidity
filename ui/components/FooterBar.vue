<script lang="ts" setup>
// Mobile menu button
import { ref } from 'vue'

const message = ref('')
const messagedecorator = ref('')
const newsletterEmail = ref('')
const currentYear = new Date().getFullYear()
const brandname = ref('Buy Me Coffee')
const footer_links = [
  { name: 'Home', icon: 'material-symbols:arrow-forward-ios', url: '/' },
  { name: 'About Us', icon: 'material-symbols:arrow-forward-ios', url: '/about' },
  { name: 'Contact Us', icon: 'material-symbols:arrow-forward-ios', url: '/contact' },
]

const socilmedia_links = [
  { name: 'Youtube', url: 'https://www.youtube.com/channel/<your_youtube_channel_id>?sub_confirmation=1', icon: 'bxl:youtube', color: 'text-red-700' },
  { name: 'Tiktok', url: 'https://www.tiktok.com/<username>', icon: 'bxl:tiktok', color: 'text-black' },
  { name: 'Facebook', url: 'https://www.facebook.com/<username>', icon: 'bxl:facebook', color: 'text-blue-600' },
  { name: 'Linktree', link: 'https://linktr.ee/<username>', icon: 'simple-icons:linktree', color: 'text-green-700' },
]

async function subscribeToNewsLetter() {
  if (newsletterEmail.value === '') { return message.value = 'Please enter your emailaddress.' }
  else if (!/\S+@\S+\.\S+/.test(newsletterEmail.value)) {
    messagedecorator.value = 'bg-gree-500 show'
    return message.value = 'Please enter a valid emaill address.'
  }
  else {
    try {
    /* eslint-disable-next-line no-console */
      console.log('Email is valid')
      const { data, error, pending } = await useFetch('/api/subscribe', {
        method: 'POST',
        body: JSON.stringify({ email: newsletterEmail.value }),
      })
      if (pending) {
        message.value = 'Submitting...'
      }
      else if (error) {
      /* eslint-disable-next-line no-console */
        console.log(error)
      // messagedecorator.value = 'bg-red-500 text-white animate-ping show'
      // message.value = 'Oops! Something went wrong!'
      }
      else {
        /* eslint-disable-next-line no-console */
        console.log(data)
      // @ ts-expect-error: ignore this issue.
        //message.value = `Thank you for subscribing ${data?.result}`
        //setTimeout(() => { message.value = '' }, 4000)
        //newsletterEmail.value = ''
      }
    }
    catch (error) {
      /* eslint-disable-next-line no-console */
      console.log("Catch all errors")
    }
  }
}
</script>

<template>
  <ClientOnly>
    <footer class="static bottom-0 left-0 min-w-full bg-gray-800 dark:text-slate-400 text-slate-400">
      <div class="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 border-b-4 px-4 py-2 border-gray-700">
        <div class="">
          <h1 class="text-lg text-center font-medium">
            Company
          </h1>
          <address>
            <span><Icon name="basil:location-solid" size="24" class="text-red-500 pr-1" />
              Johannesburg, 2000<br>
              Gauteng, South Africa <br>
            </span>
            <span><Icon name="basil:phone-solid" size="24" class="text-red-500 pr-1" />
              (+27) 71 xxx xxxxx
            </span> <br>
            <NuxtLink external to="mailto:email@gmail.com">
              <span><Icon name="basil:envelope-solid" size="24" class=" text-red-500 pr-1" />
                Email Us
              </span>
            </NuxtLink>
          </address>
        </div>
        <div class="">
          <h1 class="text-lg text-center font-medium">
            Useful Links
          </h1>
          <ul class="flex flex-col justify-center space-y-1">
            <li v-for="link in footer_links" :key="link.name">
              <NuxtLink class="hover:underline flex items-center font-semibold" :to="link.url">
                <Icon :name="link.icon" size="24" class="text-red-500 pr-1" />
                <span>{{ link.name }}</span>
              </NuxtLink>
            </li>
          </ul>
        </div>
        <div class="">
          <h1 class="text-lg text-center font-medium">
            Services
          </h1>
        </div>
        <div class="">
          <h1 class="text-lg text-center font-medium">
            Join Us
          </h1>

          <p class="py-2 text-center">
            Subscribe to our newsletter to get updates about new services and events.
          </p>
          <!--div  v-if="error" class="w-full px-3 py-4 mb-4 text rounded shadow-md -mt-72 z-1" role="alert">
            <span>{{ error }}</span>
          </div-->
          <form class="flex flex-wrap max-w-md mx-auto pt-2 rounded shadow-xl" @submit.prevent="subscribeToNewsLetter">
            <label for="email" class="block w-full my-2">
              <input id="email" v-model="newsletterEmail" type="email" required placeholder="Your Email Address" class="w-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            </label>
            <button type="submit" class="mt-2 w-full py-2 tracking-wide text-white transition-all duration-300 ease-in-out bg-red-500 hover:bg-red-400 rounded-lg focus:shadow-outline">
              Submit
            </button>
          </form>
        </div>
      </div>
      <div class=" flex flex-col items-center justify-between md:flex-row max-w-7xl mx-auto px-4 py-2">
        <div class="flex flex-col items-center justify-center">
          <div class="">
            <p>&copy; Copyright {{ currentYear }} .All rights reserved.</p>
          </div>
          <div class="">
            <p>Created with ❤️ By: &trade;{{ brandname }}</p>
          </div>
        </div>
        <div class="flex flex-col md:flex-row items-center justify-center">
          <ul class="flex flex-row items-center justify-center space-x-2">
            <li  class="cursor-pointer" v-for="link in socilmedia_links" :key="link.name">
              <NuxtLink external :to="link.url">
                <Icon :name="link.icon" :class="link.color" class="h-10 w-10 bg-gray-700 rounded-full shadow-lg p-2" />
              </NuxtLink>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  </ClientOnly>
</template>

<style>

</style>
