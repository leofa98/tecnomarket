<script>
import { defineComponent } from 'vue';
import { Carousel, Navigation, Slide } from 'vue3-carousel';
import 'vue3-carousel/dist/carousel.css';
import Producto from '../generales/Producto.vue';

export default defineComponent({
  name: 'Breakpoints',
  components: {
    Carousel,
    Slide,
    Navigation,
    Producto,
  },
  data: () => ({
    settings: {
      itemsToShow: 1,
      snapAlign: 'center',
    },

    productos: [],
    categorias: [],
    breakpoints: {
      350: {
        itemsToShow: 2,
        snapAlign: 'start',
      },

      600: {
        itemsToShow: 2.5,
        snapAlign: 'center',
      },

      800: {
        itemsToShow: 3.5,
        snapAlign: 'center',
      },
      900: {
        itemsToShow: 3.5,
        snapAlign: 'center',
      },

      // 1024 and up

      1024: {
        itemsToShow: 5,
        snapAlign: 'center',
      },
    },
  }),
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

    cargarCategorias() {
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
  },

  mounted() {
    this.cargarCategorias();
  },
});
</script>
<template>
  <Carousel v-bind="settings" :breakpoints="breakpoints" class="mt-5">
    <Slide
      v-for="categoria in categorias"
      class="d-flex justify-content-center align-items-center"
    >
      <div class="text-center carousel__item">
        <router-link
          :to="{
            name: 'categoria',

            params: { nomCategoria: categoria.descripcion },
          }"
        >
          <div class="img-categoria">
            <font-awesome-icon
              v-if="categoria.descripcion == 'ordenadores'"
              :icon="['fasl', 'computer']"
            />
            <font-awesome-icon
              v-if="categoria.descripcion == 'smartphones'"
              :icon="['fasl', 'mobile']"
            />
            <font-awesome-icon
              v-if="categoria.descripcion == 'componentes'"
              :icon="['fasl', 'memory']"
            />
            <font-awesome-icon
              v-if="categoria.descripcion == 'televisores'"
              :icon="['fasl', 'tv']"
            />
            <font-awesome-icon
              v-if="categoria.descripcion == 'monitores'"
              :icon="['fasl', 'desktop']"
            />
            <font-awesome-icon
              v-if="categoria.descripcion == 'cámaras'"
              :icon="['fasl', 'camera']"
            />
            <font-awesome-icon
              v-if="categoria.descripcion == 'audio'"
              :icon="['fasl', 'headphones']"
            />
            <font-awesome-icon
              v-if="categoria.descripcion == 'videojuegos'"
              :icon="['fasl', 'gamepad']"
            />
          </div>
          <p class="titulo-categoria">{{ categoria.descripcion }}</p>
        </router-link>
      </div>
    </Slide>

    <template #addons>
      <Navigation />
    </template>
  </Carousel>
</template>

<style scoped>
.img-categoria {
  font-size: 70px;
}
.carousel__item {
  width: 180px;
  padding: 1em;
  background-color: white;
  color: var(--gris-oscuro);
  box-shadow: var(--sombra-cajas);
}

@media screen and (max-width: 476px) {
  .carousel__item {
    width: 150px;
  }
}
.titulo-categoria {
  font-size: 20px;
  text-transform: capitalize;
}
</style>
