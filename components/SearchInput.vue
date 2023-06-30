<template>
  <div class="input-wrapper flex">
    <input class="search-input" type="text" :value="searchKeyword" @input="inputKeyword">
    <button class="btn" type="button" @click="searchProduct">
      search
    </button>
  </div>
</template>

<script setup lang="ts">
defineProps({
  searchKeyword: {
    type: String,
    required: true,
    defalt: () => ''
  }
})

const emit = defineEmits(['input-keyword', 'search-products'])
const inputKeyword = (e:Event) => {
  const value = (e.target as HTMLInputElement).value
  emit('input-keyword', value)
}
const searchProduct = () => {
  emit('search-products')
}
</script>

<style scoped>
.input-wrapper {
  height: 40px;
  margin: 1rem 0;
}
.search-input {
  width: 200px;
  font-size: 1.2rem;
  font-weight: 500;
}
.btn {
  font-size: 1.2rem;
  font-weight: 500;
}
</style>
