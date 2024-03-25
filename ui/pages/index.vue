<template>
  <div><Modal class="z-9999" @cancel="isOpen=false" @close="isOpen=false" :body="'MY Header'" :header="'My Body'" :isOpen="isOpen"/>
  <div class="w-full min-h-screen">
    <StaticHero class="z-20" @connect="isOpen = true"/>
  </div>
</div>
</template>

<script lang="ts" setup>
  const isOpen = ref(false)

</script>

<style>

</style>