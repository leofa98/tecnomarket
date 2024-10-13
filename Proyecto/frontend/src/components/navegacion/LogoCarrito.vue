<template>
  <div>
    <router-link :to="{ name: 'carrito' }" class="btn-carrito">
      <font-awesome-icon
        :icon="['fas', 'cart-shopping']"
        style="color: #ffffff"
      />
      <div class="num-productos">{{ numProductos }}</div>
    </router-link>
  </div>
</template>
<script>
export default {
  props: ['numProductos'],
};
</script>
<style scoped>
.btn-carrito {
  background-color: transparent;
  border: none;
  font-size: 25px;
  position: relative;
  color: white;
  text-decoration: none;
}

@media screen and (max-width: 576px) {
  .btn-carrito {
    font-size: 20px;
  }
}

.num-productos {
  left: 20px;
  bottom: 18px;
  display: inline-block;
  right: 4px;
  position: absolute;
  border-radius: 50%;
  width: 18px;
  height: 18px;
  text-align: center;
  align-content: center;
  font-size: 12px;
  font-weight: bold;
  color: white;
  background-color: var(--color-secundario-naranja);
}

@media screen and (max-width: 576px) {
  .num-productos {
    left: 17px;
    bottom: 14px;
  }
}
</style>
