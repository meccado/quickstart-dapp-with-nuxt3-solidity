// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  ssr: false,
  runtimeConfig: {

    public: {
      contractAddress: ''
    }
    
  },
  modules: ["@nuxtjs/tailwindcss", "nuxt-icon", "@nuxtjs/color-mode"],
  colorMode: {
    classSuffix: '',
  }
})