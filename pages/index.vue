<template>
  <div class="app">
    <main>
      <SearchInput v-model="searchKeyword" :search-keyword="searchKeyword" @input-keyword="updateKeyword" @search-products="searchProducts" />
      <ul>
        <li v-for="product in products" :key="product.id" class="item flex" @click="moveToDetailPage(product.id)">
          <img :src="product.imageUrl" :alt="product.name" class="product-image">
          <p>{{ product.name }}</p>
          <span> {{ product.price }}</span>
        </li>
      </ul>
      <div class="cart-wrapper">
        <button class="btn" @click="newProduct">
          글 작성
        </button>
        <button class="btn" @click="moveToCart">
          장바구니 바로가기
        </button>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { useProductStore } from '~/store'

const products:any = useAsyncData('Products', async () => await $fetch('/api/products')).data
const router = useRouter()
const searchKeyword = ref('')
const store = useProductStore()

const updateKeyword = (keyword:string) => {
  searchKeyword.value = keyword
}

const moveToDetailPage = (id:string) => {
  store.idNum = id
  router.push(`detail/${id}`)
}

const searchProducts = async () => {
  const name = searchKeyword.value
  if (name) {
    await useAsyncData('Products', async () => await $fetch(`/api/name/${name}`))
  } else {
    await useAsyncData('Products', async () => await $fetch('/api/products'))
  }
}

const moveToCart = () => {
  if (store.isLogin) {
    router.push('/cart')
  } else {
    alert('로그인 해주세요')
  }
}

const newProduct = () => {
  if (store.isLogin) {
    store.indexNum = products.value.length
    router.push('/product')
  } else {
    alert('로그인 해주세요')
  }
}

</script>

<style scoped>
.flex {
  display: flex;
  justify-content: center;
}
.item {
  display: inline-block;
  width: 400px;
  height: 300px;
  text-align: center;
  margin: 0 0.5rem;
  cursor: pointer;
}
.product-image {
  width: 400px;
  height: 250px;
}
.app {
  position: relative;
}
.cart-wrapper {
  position: sticky;
  float: right;
  bottom: 50px;
  right: 50px;
}
.btn {
  display: inline-block;
  height: 40px;
  font-size: 1rem;
  font-weight: 500;
  margin-left:10px;
}
</style>
