<script>
export default {};
</script>
<template>
  <router-link :to="{ name: 'home' }" class="img-container">
    <img src="/img/logo3.png" alt="logo" class="img-fluid logo" />
  </router-link>
</template>

<style scoped>
.img-container {
  display: inline-block;
}
</style>
