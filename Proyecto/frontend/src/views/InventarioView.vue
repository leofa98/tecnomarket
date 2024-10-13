<script setup>
import { ref } from 'vue';
import Ruta from '@/components/navegacion/Ruta.vue';
import TituloPagina from '@/components/generales/TituloPagina.vue';
import TablaProductos from '@/components/panelGestion/TablaProductos.vue';
import AnhadirProducto from '@/components/modales/AnhadirProducto.vue';
import EliminarProducto from '@/components/modales/EliminarProducto.vue';
const toggle = ref(true);
const emit = defineEmits(['actualizarProductos', 'anhadirProducto']);
const actualizarProductos = () => {
  toggle.value = !toggle.value;
};
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
            name: 'gestionInventario',
          },
          texto: 'Gestión de inventario',
        },
      ]"
    />
    <div class="container-lg px-4 px-lg-0">
      <TituloPagina :titulo="'Gestión de inventario'"></TituloPagina>
      <TablaProductos :toggle="toggle" />
    </div>
  </main>
  <AnhadirProducto @actualizarProductos="actualizarProductos" />
</template>
