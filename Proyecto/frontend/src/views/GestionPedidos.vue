<script setup>
import TituloPagina from '@/components/generales/TituloPagina.vue';
import Ruta from '@/components/navegacion/Ruta.vue';
import TablaPedidos from '@/components/panelGestion/TablaPedidos.vue';
import AnhadirProducto from '@/components/modales/AnhadirProducto.vue';
const emit = defineEmits(['actualizarProductos', 'anhadirProducto']);
</script>

<template>
  <main>
    <Ruta
      :rutas="[
        {
          to: {
            name: 'panelGestion',
          },
          texto: 'Panel de gestión',
        },
        {
          to: {
            name: 'gestionPedidos',
          },
          texto: 'Gestión de pedidos',
        },
      ]"
    />
    <div class="container-lg px-4 px-lg-0">
      <TituloPagina :titulo="'Gestión de pedidos'"></TituloPagina>
      <TablaPedidos></TablaPedidos>
    </div>
  </main>
  <AnhadirProducto></AnhadirProducto>
</template>
