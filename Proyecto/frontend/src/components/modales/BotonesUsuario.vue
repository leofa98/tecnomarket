<script>
export default {
  props: ['nombre'],
  emits: ['logout'],
};
</script>
<template>
  <div class="d-none d-lg-flex align-items-center">
    <div class="usuario">
      <p>
        ¡Hola
        {{ this.nombre }}!
      </p>
      <router-link :to="{ name: 'perfil' }"
        ><b>Cuenta y pedidos</b></router-link
      >
    </div>
    <button
      @click="$emit('logout')"
      class="d-lg-flex d-none btn-logout justify-content-center ms-4 column-gap-3 align-items-center"
    >
      <font-awesome-icon
        style="color: #ffffff"
        icon="fa-solid fa-arrow-right-from-bracket"
      />
      <span>Salir</span>
    </button>
  </div>
</template>
<style scoped>
.btn-logout {
  width: 123px;
  height: 38px;
  border: none;
  color: white;
  font-weight: bold;
  border-radius: 5px;
  font-size: 16px;
  background-color: black;
  transition: opacity 0.2s ease;
}

.usuario {
  color: white;
  font-size: 14px;
}

.usuario p {
  margin: 0;
}

.usuario a {
  color: white;
  text-decoration: none;
}
</style>
