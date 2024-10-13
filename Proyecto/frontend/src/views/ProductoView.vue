<script setup>
import ProductoImagen from "@/components/productos/ProductoImagen.vue";
import ProductoDetalle from "@/components/productos/ProductoDetalle.vue";
import Ruta from "@/components/navegacion/Ruta.vue";
import Resenhas from "@/components/productos/Resenhas.vue";
import { ref } from "vue";
const cargarResenhas = ref(true);

const emit = defineEmits(["anhadirProducto"]);
</script>

<template>
  <main>
    <Ruta
      :rutas="[
        {
          to: {
            name: 'categoria',
            params: { nomCategoria: $route.params.nomCategoria },
          },
          texto:
            $route.params.nomCategoria.charAt(0).toUpperCase() +
            $route.params.nomCategoria.slice(1),
        },

        {
          to: {
            name: 'producto',
            params: { nomProducto: $route.params.nomProducto },
          },
          texto: $route.params.nomProducto,
        },
      ]"
    />
    <div class="container-lg px-4 px-lg-0">
      <div class="row mx-md-3 mx-sm-0 mt-4 gx-xxl-5">
        <div class="col-md mb-4 mb-md-0 col-lg-7">
          <ProductoImagen :idProducto="$route.params.idProducto" />
        </div>
        <div class="col-md">
          <ProductoDetalle
            :cargarResenhas="cargarResenhas"
            @anhadirProducto="$emit('anhadirProducto')"
            :idProducto="$route.params.idProducto"
          />
        </div>
      </div>

      <div class="row mt-4 gx-xxl-5 mx-md-3 mx-sm-0">
        <div class="col-md">
          <Resenhas
            @cargarResenhas="cargarResenhas = !cargarResenhas"
            :idProducto="$route.params.idProducto"
          />
        </div>
      </div>
    </div>
  </main>
</template>
