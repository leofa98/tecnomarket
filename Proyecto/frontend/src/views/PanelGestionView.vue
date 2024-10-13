<script setup>
import TituloPagina from "@/components/generales/TituloPagina.vue";
import Ruta from "@/components/navegacion/Ruta.vue";
import BotonesPanel from "@/components/panelGestion/BotonesPanel.vue";
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
      ]"
    />
    <div class="container-lg px-4 px-lg-0 mt-5">
      <TituloPagina :titulo="'Panel de gestión'" />
      <BotonesPanel />
    </div>
  </main>
</template>
