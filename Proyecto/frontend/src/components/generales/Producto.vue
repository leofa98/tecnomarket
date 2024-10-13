<script>
import Estrellas from './Estrellas.vue';
export default {
  props: ['productoProp'],
  data() {
    return {
      resenhas: [],
    };
  },
  watch: {
    productoProp: function () {
      this.cargarResenhas(this.productoProp.id);
    },
  },
  components: {
    Estrellas,
  },
  mounted() {
    this.cargarResenhas(this.productoProp.id);
  },

  methods: {
    cargarResenhas(idProducto) {
      fetch(this.backend + '/resenhas/' + idProducto)
        .then((response) => {
          if (!response.ok) {
            throw new Error(`Error: ${response.status}`);
          }

          return response.json();
        })
        .then((data) => {
          this.resenhas = data;
        })
        .catch((error) => {
          console.error(`Error al obtener los datos: ${error}`);
        });
    },
  },

  computed: {
    numResenhas() {
      return this.resenhas.length;
    },

    mediaValoraciones() {
      return (
        this.resenhas.reduce((total, resenha) => {
          return (total += Number(resenha.valoracion));
        }, 0) / this.numResenhas
      );
    },
  },
};
</script>
<template>
  <router-link
    :to="{
      name: 'producto',
      params: {
        nomProducto: productoProp.nombre,
        nomCategoria: productoProp.categoria.descripcion,
        idProducto: productoProp.id,
      },
    }"
  >
    <div class="producto">
      <div v-if="productoProp.descuento !== 0" class="descuento">
        <span>-{{ productoProp.descuento }}%</span>
      </div>
      <div
        class="producto-imagen"
        :style="{
          'background-image': 'url(' + productoProp.imagen + ')',
        }"
      ></div>

      <div class="producto-cuerpo px-2">
        <p class="producto-nombre">{{ productoProp.nombre }}</p>

        <div class="producto-precio mb-3">
          <span
            class="producto-precio-final"
            :class="{ oferta: productoProp.descuento != 0 }"
            >{{
              (
                productoProp.precio -
                (productoProp.precio / 100) * productoProp.descuento
              ).toFixed(2) + '€'
            }}</span
          ><span
            v-if="productoProp.descuento !== 0"
            class="producto-precio-descuento"
            >{{ productoProp.precio }}€</span
          >
        </div>

        <Estrellas
          :numResenhas="numResenhas"
          :mediaValoraciones="mediaValoraciones"
        />
      </div>
    </div>
  </router-link>
</template>

<style>
a {
  text-decoration: none;
  color: none;
  color: var(--gris-oscuro);
}
.producto {
  background-color: white;
  position: relative;
  height: 330px;
  padding: 1em;
  overflow: hidden;
  overflow-wrap: break-word;
  box-shadow: var(--sombra-cajas);
}

.producto-imagen {
  height: 160px;
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
  margin-bottom: 1em;
}

.oferta {
  color: var(--color-secundario-naranja);
}
.producto-nombre {
  display: block;
  text-decoration: none;
  height: 50px;
  margin: 0;

  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  max-height: 3.2em;
  text-decoration: none;
}

.producto-precio-final {
  margin-right: 1em;
  font-weight: bold;
  height: 50px;
  font-size: 17px;
  text-decoration: none;
}

.producto-precio-descuento {
  text-decoration: line-through;
  font-size: 14px;
}

.descuento {
  background: var(--degradado-naranja);
  height: 100px;
  left: -50px;
  position: absolute;
  top: -50px;
  width: 100px;
  -webkit-transform: rotate(-45deg);
}

.descuento span {
  color: #f5f5f5;
  font-family: sans-serif;
  font-size: 18px;
  font-weight: bold;
  left: 26px;
  top: 70px;
  position: absolute;
  width: 80px;
}
</style>
