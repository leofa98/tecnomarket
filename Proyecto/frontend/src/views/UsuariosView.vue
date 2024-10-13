<script setup>
import TituloPagina from '@/components/generales/TituloPagina.vue';
import Ruta from '@/components/navegacion/Ruta.vue';
import TablaUsuarios from '@/components/panelGestion/TablaUsuarios.vue';
import AnhadirProducto from '@/components/modales/AnhadirProducto.vue';
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
            name: 'gestionUsuarios',
          },
          texto: 'Gestión de usuarios',
        },
      ]"
    />
    <div class="container-lg px-4 px-lg-0">
      <TituloPagina :titulo="'Gestión de usuarios'"></TituloPagina>
      <TablaUsuarios></TablaUsuarios>
    </div>
  </main>
</template>
