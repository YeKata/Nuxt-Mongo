<template>
  <div class="list-wrapper">
    <ul>
      <li v-for="Item in data" :key="Item" class="list-item">
        <img :src="Item.imageUrl" :alt="Item.name" class="thumbnail">
        <div class="description">
          <p>{{ Item.name }}</p>
          <span>{{ Item.price }}</span>
          <p>{{ Item.count }} 개</p>
          <p /><button @click="deletecart(Item.id)">
            x
          </button>
        </div>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { useProductStore } from '~/store'

const store = useProductStore()
const { data }:any = useAsyncData('Products', async () => await store.cartItems)

const deletecart = async (item:number) => {
  await store.deleteCartItem(item)
  refreshNuxtData('Products')
}

</script>

<style scoped>
.container {
  margin: 2rem 10rem;
}
.list-title {
  font-weight: 700;
  font-size: 1.4rem;
}
.list-wrapper {
  margin: 0.4rem 0;
}
.list-item {
  display: flex;
}
.thumbnail {
  width: 100px;
  height: 100px;
}
.description {
  padding: 1rem 1rem;
}
.extra-panel {
  text-align: right;
  padding: 0.2rem 0;
}
</style>
