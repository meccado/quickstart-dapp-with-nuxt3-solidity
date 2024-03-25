import { useNuxtApp } from "#app"

export const useEthers = () => {
  const nuxtApp  = useNuxtApp()
  return nuxtApp.$ethers
}
