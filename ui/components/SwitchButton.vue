<script lang="ts" setup>

  const checked = ref(false)
  const props = defineProps({
    color: { type: String, default : 'after:bg-gray-500'},
  })

  function toggle(theme: string) {
    useColorMode().preference = theme
  }

  onMounted(() => {
    if (useColorMode().preference === 'dark' && checked.value === false) checked.value = true
  })
</script>

<template>
  <ClientOnly>
    <button class="w-full px-4 tracking-wide dark:text-slate-400 text-slate-800; transition-all duration-300 ease-in-out bg-transparent  hover:bg-gray-200 dark:hover:bg-slate-800 dark:bg-transparent  rounded-lg focus:shadow-outline" @change="toggle($colorMode.preference === 'dark' ? 'light' : 'dark')">
      <label class="flex justify-between items-center p-2 text-lg relative">
        <Icon name="uil:sun" class="text-yellow-600" size="24"/>
        <input type="checkbox" :checked="checked" v-model="checked"  class="hover:cursor-pointer appearance-none peer absolute w-full h-full rounded-md left-1/2 -translate-x-1/2">
        <span :class="`${props.color}`" class="flex items-center flex-shrink-0 w-16 h-8 rounded-full bg-gray-300 p-1 ml-2 mr-2  after:w-6 after:h-6  after:rounded-full after:shadow-md peer-checked:bg-gray-700 transition duration-300 ease-in-out after:transition after:duration-300 peer-checked:after:translate-x-8" />
        <Icon name="uil:moon" class="text-black dark:text-white" size="24"/>
      </label>
    </button>
  </ClientOnly>
</template>

<style>

</style>
