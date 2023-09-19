<template>
  <div>
    {{ products }}
  </div>
</template>

<script setup lang="ts">
const products:any = reactive(await useAsyncData('product', () => $fetch('https://yekata.github.io/mongo/products')))
</script>

<style scoped>

</style>
