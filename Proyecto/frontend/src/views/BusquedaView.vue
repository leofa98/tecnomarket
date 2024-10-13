<script setup>
import TituloBusqueda from '@/components/busqueda/TituloBusqueda.vue';
import ProductosBusqueda from '@/components/busqueda/ProductosBusqueda.vue';
import Ruta from '@/components/navegacion/Ruta.vue';
</script>

<template>
  <main>
    <Ruta :rutas="[{ to: { name: '', params: '' }, texto: 'Búsqueda' }]" />
    <div class="container-lg">
      <TituloBusqueda
        :busqueda="$route.params.busqueda"
        :categoria="$route.params.nomCategoria || undefined"
      />
      <ProductosBusqueda
        :busqueda="$route.params.busqueda"
        :categoria="$route.params.nomCategoria"
      />
    </div>
  </main>
</template>
