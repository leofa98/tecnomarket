<script setup>
import ProductosCategoria from '../components/busqueda/ProductosCategoria.vue';
import TituloPagina from '../components/generales/TituloPagina.vue';
import Ruta from '@/components/navegacion/Ruta.vue';
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
          texto: $route.params.nomCategoria,
        },
      ]"
    />
    <div class="container-lg bg-transparent px-4 px-lg-0">
      <TituloPagina
        :titulo="
          $route.params.nomCategoria.charAt(0).toUpperCase() +
          $route.params.nomCategoria.slice(1)
        "
      >
      </TituloPagina>
      <ProductosCategoria
        :nomCategoria="$route.params.nomCategoria"
      ></ProductosCategoria>
    </div>
  </main>
</template>
