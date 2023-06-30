<template>
  <div>
    <div class="container">
      <div class="wrapper">
        <div class="inline-block">
          상품명
        </div> <input v-model="name" class="input-box" type="text">
      </div>
      <div class="wrapper">
        <div class="inline-block">
          가격
        </div> <input v-model="price" class="input-box" type="number">
      </div>
      <div class="wrapper">
        <div class="inline-block">
          사진
        </div> <input
          id="file"
          multiple
          type="file"
          class="inputfile"
          @change="upload"
        >
      </div>
      <div
        class="upload-image"
        :style="{ backgroundImage: `url(${url})` }"
      />
      <button @click="postProduct">
        등록
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useProductStore } from '~/store'

const url = ref('')
const price = ref('')
const name = ref('')
const store = useProductStore()
const router = useRouter()
const index = store.indexNum

const upload = (e: Event) => {
  const target = e.target as HTMLInputElement
  const file = target.files
  if (!file) { return }
  url.value = URL.createObjectURL(file[0])
}

const postProduct = async () => {
  const product = {
    id: index,
    name: name.value,
    price: price.value,
    imageUrl: url.value
  }
  await useAsyncData('Products', async () => await $fetch('/api/products', {
    method: 'post',
    body: product
  }))
  router.push('/')
}
</script>

<style scoped>

.container {
  max-width: 600px;
  min-width: 500px;
  margin:10px;
}

input[type="number"]::-webkit-outer-spin-button,
input[type="number"]::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
}

span {
  width: 10px;
}
.wrapper {
  padding-bottom: 10px;
}
.inline-block {
  display: inline-block;
  width: 50px;
}

.input-box {
  width:85%
}

.upload-image {
    width: 100%;
    height: 450px;
    background: cornflowerblue;
    background-size: cover;
  }

  button {
    margin-top: 10px;
  }
</style>
