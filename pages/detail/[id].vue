<template>
  <div>
    <div class="container">
      <div class="main-panel">
        <img
          class="product-image"
          :src="product.imageUrl"
          :alt="product.name"
        >
      </div>
      <div class="side-panel">
        <p class="name">
          {{ product.name }}
        </p>
        <p class="price">
          {{ product.price }}
        </p>
        <button type="button" @click="addToCart">
          카트에 담기
        </button>
        <p v-if=" store.idNum>= 30">
          <button @click="deleteProduct">
            x
          </button>
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useProductStore } from '~/store'

const route = useRoute()
const router = useRouter()
const store = useProductStore()
const id = route.params.id

const product:any = useAsyncData('Products', async () => await $fetch(`/api/products/${id}`)).data

const addToCart = () => {
  if (store.isLogin) {
    store.addCartItem(product.value, (id as string))
    router.push('/cart')
  } else {
    alert('로그인 해주세요')
  }
}

const deleteProduct = async () => {
  if (store.isLogin) {
    await useAsyncData('Products', async () => await $fetch(`/api/products/${id}`, {
      method: 'delete'
    }))
  } else {
    alert('로그인 해주세요')
  }
  store.idNum = 0
  router.push('/')
}
</script>

<style scoped>
.container {
  display: flex;
  justify-content: center;
  margin: 2rem 0;
}
.product-image {
  width: 500px;
  height: 375px;
}
.side-panel {
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 220px;
  text-align: center;
  padding: 0 1rem;
}

.delete:hover {
  cursor: pointer;
}
</style>
