<template>
  <div  v-if="props.isOpen" class="opacity-30 fixed insert-0 bg-black flex justify-center items-center h-screen w-screen">
    <div class="fixed insert-0 flex bg-white justify-center items-center z-50">
      <div class="flex flex-col max-w-5xl rounded-lg shadow-lg">
        <div class="p-5"><!-- HEADER -->
          <div class="flex justify-between items-start">
            <h3 class="text-2xl font-semibold">{{ props.header }}</h3>
            <button class="p-1 leading-none" @click="emitCancel()">
              <div class="text-xl font-semibold h-6 w-6">
                <Icon name="material-symbols:close-small-rounded" size="24"/>
              </div>
            </button>
          </div>
        </div>
        <div class="p-6"><!-- BODY -->
          <p> {{  props.body }} </p>
        </div>
        <div class="p-6 flex justify-center items-center"><!-- FOOTER -->
          <button class="mb-2 inline-block rounded bg-red-600 px-12 pt-4 pb-3.5 text-sm font-medium uppercase leading-normal text-white shadow-md transition duration-150 ease-in-out hover:bg-red-600 hover:shadow-md focus:bg-red-600 focus:shadow-[0_8px_9px_-4px_rgba(220,76,100,0.3),0_4px_18px_0_rgba(220,76,100,0.2)] focus:outline-none focus:ring-0 active:bg-red-700 active:shadow-md dark:shadow-md dark:hover:shadow-md dark:focus:shadow-md dark:active:shadow-md md:mr-2 md:mb-0" @click="emitCancel()">Cancel</button>
          <button class="inline-block rounded px-12 pt-4 pb-3.5 text-sm font-medium uppercase leading-normal text-red-600 transition duration-150 ease-in-out hover:bg-neutral-500 hover:bg-opacity-10 hover:text-red-600 focus:text-red-600 focus:outline-none focus:ring-0 active:text-red-700 dark:hover:bg-neutral-700 dark:hover:bg-opacity-40  ml-2" @click="emitConfirm()">Confirm</button>
        </div>
      </div>

    </div>
  </div>
</template>


<script lang="ts" setup>

  // <Modal @cancel="isOpen=false" @close="isOpen=false" :body="'MY Header'" :header="'My Body'" :isOpen="isOpen"/>
  //const isOpen = ref(false)

  console.log("Opening Modal")

  const props = defineProps({
    header: { type: String, required: true },
    body:  { type: String, required: true },
    isOpen: {type: Boolean, default: false},
  })
  // Emit events to parent component
  const emit = defineEmits(['confirm', 'cancel'])

  const emitConfirm = () => {
    emit('confirm')
  }

  const emitCancel = () => {
    emit('cancel')
  }

</script>