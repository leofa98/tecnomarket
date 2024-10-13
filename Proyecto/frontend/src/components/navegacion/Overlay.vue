<script>
export default {
  props: ['active'],
};
</script>
<template>
  <div>
    <div :class="{ 'overlay-activo': active }" class="overlay"></div>
  </div>
</template>

<style scoped>
.overlay {
  top: 0;
  left: 0;
  overflow-x: b;
  display: none;
  position: absolute;
  width: 100vh;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.7);
  z-index: 100;
}

.overlay-activo {
  display: block !important;
}
</style>
