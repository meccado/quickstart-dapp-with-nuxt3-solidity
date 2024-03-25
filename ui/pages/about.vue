<template>
  <div class="w-full min-h-screen">
    <Modal @cancel="isOpen=false" @close="isOpen=false" :body="'MY Header'" :header="'My Body'" :isOpen="isOpen"/>
        
  </div>
</template>

<script lang="ts" setup>

  const isOpen = ref(true)

</script>

<style>

</style>