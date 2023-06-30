<template>
  <div class="container">
    <h1 class="list-title">
      카트 페이지
    </h1>
    <CartList />
    <div class="extra-panel">
      <button @click="BuyProducts">
        구매하기
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import CartList from '~/components/CartList.vue'
import { useProductStore } from '~/store'

const router = useRouter()
const store = useProductStore()

const BuyProducts = () => {
  if (store.isLogin) {
    router.push('/buy')
  } else {
    alert('로그인 해주세요')
  }
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
  padding: 2rem 1rem;
}
.extra-panel {
  text-align: right;
  padding: 0.2rem 0;
}
</style>
