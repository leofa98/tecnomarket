<script>
export default {};
</script>
<template>
  <div class="row px-1 px-sm-5 px-md-0 g-4">
    <div class="col-md">
      <router-link
        :to="{ name: 'gestionInventario' }"
        class="btn-gestion mx-auto row"
      >
        <div
          class="col col-md-12 col-xl-6 d-flex justify-content-center align-items-center"
        >
          <p>Gestionar<br />inventario</p>
        </div>
        <div class="mt-md-4 mt-xl-0 col col-md-12 col-xl-6 text-center">
          <font-awesome-icon :icon="['fas', 'clipboard']" />
        </div>
      </router-link>
    </div>
    <div class="col-md">
      <router-link
        class="btn-gestion row mx-auto"
        :to="{ name: 'gestionUsuarios' }"
      >
        <div
          class="col col-md-12 col-xl-6 d-flex justify-content-center align-items-center"
        >
          <p>Gestionar<br />usuarios</p>
        </div>
        <div class="mt-md-4 mt-xl-0 col col-md-12 col-xl-6 text-center">
          <font-awesome-icon :icon="['fas', 'user']" />
        </div>
      </router-link>
    </div>
    <div class="col-md">
      <router-link
        class="btn-gestion row mx-auto"
        :to="{ name: 'gestionPedidos' }"
      >
        <div
          class="col col-md-12 col-xl-6 d-flex justify-content-center align-items-center"
        >
          <p>Gestionar<br />pedidos</p>
        </div>
        <div class="mt-md-4 mt-xl-0 col col-md-12 col-xl-6 text-center">
          <font-awesome-icon :icon="['fas', 'box']" />
        </div>
      </router-link>
    </div>
  </div>
</template>

<style scoped>
.btn-gestion {
  padding: 1.5em;
  background: var(--degradado-naranja);
  transition: filter 0.2s ease;
}

.btn-gestion p {
  color: white;
  text-align: center;
  margin: 0;

  font-size: 25px;
}

.btn-gestion .svg-inline--fa {
  color: white;

  font-size: 75px;
}

.btn-gestion:hover {
  filter: brightness(110%);
}
</style>
