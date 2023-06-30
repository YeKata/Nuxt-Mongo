<template>
  <div />
</template>

<script setup lang="ts">
import { useProductStore } from '~/store'

const route = useRoute()
const router = useRouter()
const store = useProductStore()

onMounted(async () => {
  const config = useRuntimeConfig()
  try {
    if (route.query.code) {
      const response = await $fetch('https://kauth.kakao.com/oauth/token', {
        method: 'post',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
        },
        params: {
          grant_type: 'authorization_code',
          client_id: config.public.restApi,
          redirect_uri: `${window.location.origin}/login`,
          code: route.query.code
        }
      })
      if (response) {
        store.isLogin = true
        store.userToken = response.access_token
        router.push('/')
      } else {
        console.log('Not found data')
      }
    } else {
      console.log('Not found code')
    }
  } catch (error) {
    console.log(error)
  }
})
</script>
<style scoped>

</style>
