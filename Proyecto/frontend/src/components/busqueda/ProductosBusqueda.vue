<script>
import Producto from '../generales/Producto.vue';

export default {
  data() {
    return {
      productos: null,
    };
  },

  components: {
    Producto,
  },
  props: ['busqueda', 'categoria'],
  methods: {
    buscarProductos(busqueda) {
      fetch(this.backend + '/productos/buscar/' + busqueda)
        .then((response) => {
          if (!response.ok) {
            throw new Error(`${response.status}`);
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

  watch: {
    busqueda: function (newBusqueda) {
      this.buscarProductos(newBusqueda);
    },
  },

  computed: {
    productoPorCategoria() {
      if (this.productos != null && this.categoria) {
        return this.productos.filter(
          (producto) => producto.categoria.descripcion == this.categoria
        );
      } else {
        return this.productos;
      }
    },
  },

  mounted() {
    this.buscarProductos(this.busqueda);
  },
};
</script>
<template>
  <div
    v-if="productoPorCategoria != null && !productoPorCategoria.length"
    class="alert alert-danger text-center"
    role="alert"
  >
    No se han encontrado resutados para su búsqueda
  </div>
  <div class="productos-categoria row g-3 g-xl-4 g-xxl-5">
    <div
      v-for="producto in productoPorCategoria"
      class="col-sm-6 col-md-4 col-xl-3"
    >
      <Producto :productoProp="producto" />
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
