<template>
  <div class="body">
    <div class="head_bar">
      <header class="title">
        <NuxtLink class="logo" to="/">
          Nuxt Shopping
        </NuxtLink>
        <LoginBanner />
      </header>
    </div>
    <slot />
  </div>
</template>

<script setup lang="ts">

</script>

<style scoped>

header {
  height: 60px;
  align-items: center;
  padding: 0 0.5rem;
}
.logo {
  font-weight: 900;
}
.logo:visited {
  color: inherit;
}
.title {
  display: flex;
  justify-content: space-between;
}
</style>
