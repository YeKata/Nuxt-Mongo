<template>
  <div v-if="!store.isLogin" class="login" @click="loginWithKakao">
    <img src="~/assets/kakao_login_medium_narrow.png">
  </div>

  <div v-else class="login">
    <div @click="logOutWithKakao">
      logout
    </div>
  </div>
</template>

<script setup lang="ts">
import { useProductStore } from '~/store'
import { logout } from '~/types'

const store = useProductStore()
const config = useRuntimeConfig().public

const Kakaoinit = () => {
  Kakao.init('6e86cd6ba029033989889fdda42c441a')
  Kakao.isInitialized()
}

const loginWithKakao = () => {
  Kakao.Auth.authorize({
    redirectUri: config.redirectUri
  })
}

const logOutWithKakao = async () => {
  const logoutconfirm = confirm('장바구니에 담긴 물건들이 모두 삭제됩니다')
  if (logoutconfirm) {
    const response:logout = await $fetch('https://kapi.kakao.com/v1/user/logout', {
      method: 'post',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
        Authorization: `Bearer ${store.userToken}`
      }
    })
    if (response.id) {
      alert('로그아웃 되었습니다')
      store.isLogin = false
      store.cartItems.splice(store.cartItems.length)
    } else {
      console.log('잘못된 시도입니다')
    }
  }
}

onMounted(() => {
  Kakaoinit()
})
</script>

<style scoped>
.login:hover {
  cursor: pointer;
}
</style>
