<script>
import Resenha from './Resenha.vue';
import FormularioResenha from './FormularioResenha.vue';
import { jwtDecode } from 'https://unpkg.com/jwt-decode@4.0.0?module';
export default {
  props: ['idProducto'],
  emits: ['cargarResenhas'],
  components: {
    Resenha,
    FormularioResenha,
  },
  data() {
    return {
      resenhas: [],
      oculto: true,
      token: null,
    };
  },
  watch: {
    idProducto: function (idProducto) {
      this.cargarResenhas(idProducto);
    },
  },
  mounted() {
    this.token = this.$cookies.get('token') ?? '';
    this.cargarResenhas(this.idProducto);
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
          this.$emit('cargarResenhas');
        })
        .catch((error) => {
          console.error(`Error al obtener los datos: ${error}`);
        });
    },
  },
  computed: {
    usuario() {
      return this.token ? jwtDecode(this.token) : '';
    },
  },
};
</script>
<template>
  <div class="contenedor-resenhas py-5 px-4 px-sm-5">
    <div
      class="cabecera-resenhas d-flex justify-content-between align-items-center"
    >
      <h4>
        Reseñas <span>({{ resenhas.length }})</span>
      </h4>
      <button
        v-if="resenhas.length"
        @click="oculto = !oculto"
        :class="{ arriba: oculto }"
      >
        <font-awesome-icon icon="fa-solid fa-angle-up" />
      </button>
    </div>
    <div class="resenhas" :class="{ expandir: !oculto }">
      <hr />
      <Resenha v-for="resenha in resenhas" :resenhaProp="resenha"></Resenha>
    </div>
    <FormularioResenha
      @cargarResenhas="cargarResenhas"
      v-if="this.token && !usuario.admin"
      :idProducto="idProducto"
    />
  </div>
</template>

<style>
.contenedor-resenhas {
  min-height: auto;
  box-shadow: var(--sombra-cajas);
  background-color: white;
}
.arriba {
  transform: rotate(180deg);
}

.resenhas {
  max-height: 0px;
  overflow: hidden;
  transition: max-height 0.2s ease-in-out;
}

.expandir {
  max-height: 800vh;
}
.cabecera-resenhas button {
  background: none;
  border: 0;
  transition: transform ease 0.2s;
}
.fa-angle-up {
  font-size: 30px;
  color: var(--gris-oscuro);
}
</style>
