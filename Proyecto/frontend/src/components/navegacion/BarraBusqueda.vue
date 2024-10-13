<script>
import router from '../../router';
export default {
  props: ['categorias'],
  data() {
    return {
      busqueda: '',
      categoria: '',
    };
  },
  methods: {
    buscar() {
      if (this.busqueda.trim()) {
        router.push({
          path: `/productos/buscar/${this.busqueda.replaceAll('/', '')}/${
            this.categoria
          }`,
        });
        this.$refs.inputSearch.blur();
        this.$refs.inputSearchSm.blur();
      }
    },
  },
};
</script>
<template>
  <form @submit.prevent="buscar">
    <div class="d-none d-md-inline-flex ps-xxl-5 buscador input-group">
      <select class="form-select" v-model="categoria">
        <option value="" selected>Categorías</option>
        <option v-for="categoria in categorias" :value="categoria.descripcion">
          {{
            categoria.descripcion.charAt(0).toUpperCase() +
            categoria.descripcion.slice(1)
          }}
        </option>
      </select>
      <input
        ref="inputSearch"
        v-model="busqueda"
        type="text"
        class="form-control"
        placeholder="Buscar producto..."
      />
      <button class="btn btn-light" type="submit" id="boton-buscar">
        <font-awesome-icon icon="fa-solid fa-search" style="color: #272727" />
      </button>
    </div>

    <div
      class="d-inline-flex d-md-none ps-xxl-5 buscador input-group input-group-sm"
    >
      <select class="form-select" v-model="categoria">
        <option value="" selected>Categorías</option>
        <option v-for="categoria in categorias" :value="categoria.descripcion">
          {{
            categoria.descripcion.charAt(0).toUpperCase() +
            categoria.descripcion.slice(1)
          }}
        </option>
      </select>
      <input
        ref="inputSearchSm"
        v-model="busqueda"
        type="text"
        class="form-control form-control-sm"
        placeholder="Buscar producto..."
      />
      <button class="btn btn-light" type="submit" id="boton-buscar-sm">
        <font-awesome-icon icon="fa-solid fa-search" style="color: #272727" />
      </button>
    </div>
  </form>
</template>

<style scoped>
input {
  width: 55% !important;
}

select {
  width: 30% !important;
}
</style>
