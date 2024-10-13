<script>
import Producto from '../generales/Producto.vue';

export default {
  data() {
    return {
      productos: [],
    };
  },

  components: {
    Producto,
  },

  props: ['nomCategoria'],

  watch: {
    nomCategoria: function (newCategoria) {
      this.cargarProductos(newCategoria);
    },
  },

  mounted() {
    this.cargarProductos(this.nomCategoria);
  },

  methods: {
    cargarProductos(categoria) {
      fetch(this.backend + '/productos/categoria/' + categoria)
        .then((response) => {
          if (!response.ok) {
            throw new Error(response.status);
          }
          return response.json();
        })
        .then((data) => {
          this.productos = data;
        })
        .catch((error) => {
          console.error(`Error al obtener los datos: ${error}`);
        });
    },
  },
};
</script>
<template>
  <div class="productos-categoria row g-3 g-xl-4 g-xxl-5">
    <div
      v-for="producto in productos"
      class="col-sm-6 col-md-4 col-xl-3 col-xxl-3"
    >
      <Producto :productoProp="producto"></Producto>
    </div>
  </div>
</template>

<style scoped>
@media screen and (max-width: 576px) {
  .productos-categoria {
    margin-left: 10%;
    margin-right: 10%;
  }
}
</style>
