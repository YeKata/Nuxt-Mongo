<template>
  <div>
    {{ products }}
  </div>
</template>

<script setup lang="ts">
const products:any = reactive(await useAsyncData('product', () => $fetch('http://localhost:3000/products')))
</script>

<style scoped>

</style>
