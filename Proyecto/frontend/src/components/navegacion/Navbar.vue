<script>
import Logo from './Logo.vue';
import LogoCarrito from './LogoCarrito.vue';
import Sesion from './Sesion.vue';
import BarraBusqueda from './BarraBusqueda.vue';
import BarraCategorias from './BarraCategorias.vue';
import BotonHamburguesa from './BotonHamburguesa.vue';
import { jwtDecode } from 'https://unpkg.com/jwt-decode@4.0.0?module';

export default {
  props: ['numProductos'],
  emits: ['login', 'logout'],
  data() {
    return {
      categorias: '',
      productosCarrito: [],
      token: '',
    };
  },
  components: {
    Logo,
    LogoCarrito,
    Sesion,
    BarraBusqueda,
    BarraCategorias,
    BotonHamburguesa,
  },
  methods: {
    login() {
      this.token = this.$cookies.get('token');
      this.$emit('login');
    },
    logout() {
      this.token = '';
      this.$emit('logout');
    },
  },

  mounted() {
    this.token = this.$cookies.get('token');
    fetch(this.backend + '/categorias')
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Error:${response.status}`);
        }
        return response;
      })
      .then((response) => response.json())
      .then((data) => {
        this.categorias = data;
      })
      .catch((error) => {
        console.error(`Error al obtener los datos: ${error}`);
      });
  },
  computed: {
    usuario() {
      return this.token ? jwtDecode(this.token) : '';
    },
  },
};
</script>
<template>
  <header>
    <nav class="barra-navegacion position-absoluteS pb-lg-0">
      <div class="container-xl">
        <div class="row align-items-center">
          <div class="d-flex col-9 col-sm-6 col-md-4 col-lg-3">
            <Logo />
          </div>
          <div
            class="text-center col-md-6 col-lg-4 col-xl-5 order-2 mt-3 mt-md-0 order-md-1"
          >
            <BarraBusqueda :categorias="categorias" />
          </div>
          <div
            class="order-1 order-md-2 col-3 col-sm-6 col-md d-flex column-gap-3 align-items-center justify-content-end"
          >
            <Sesion @logout="logout" @login="login" />
            <LogoCarrito
              v-if="!usuario.admin || !usuario"
              :numProductos="numProductos"
            />
            <div v-else>
              <router-link
                :to="{
                  name: 'panelGestion',
                }"
              >
                <font-awesome-icon icon="fa-solid fa-gears" />
              </router-link>
            </div>
          </div>
        </div>
        <BarraCategorias />
      </div>
    </nav>
  </header>
</template>

<style>
.barra-navegacion {
  padding: 1em;
  background-color: var(--gris-oscuro);
}
.fa-gears {
  background-color: transparent;
  border: none;
  font-size: 25px;
  position: relative;
  color: white;
  text-decoration: none;
}

@media screen and (max-width: 576px) {
  .fa-gears {
    font-size: 20px;
  }
}
</style>
