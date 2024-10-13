<script setup>
import ProductosCarrito from '../components/busqueda/ProductosCarrito.vue';
import TituloPagina from '../components/generales/TituloPagina.vue';
import Ruta from '@/components/navegacion/Ruta.vue';
const emit = defineEmits(['actualizarProductos']);
</script>

<template>
  <main>
    <Ruta :rutas="[{ to: { name: 'carrito' }, texto: 'Carrito' }]" />
    <div class="container-lg bg-transparent px-4 px-lg-0">
      <TituloPagina :titulo="'Mi carrito'"> </TituloPagina>
      <ProductosCarrito
        @actualizarProductos="$emit('actualizarProductos')"
      ></ProductosCarrito>
    </div>
  </main>
</template>
