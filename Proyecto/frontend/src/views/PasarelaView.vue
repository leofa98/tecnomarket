<script setup>
import DetallesPedido from '@/components/pasarelaPago/DetallesPedido.vue';
import Ruta from '@/components/navegacion/Ruta.vue';
const emit = defineEmits(['actualizarProductos']);
</script>

<template>
  <main>
    <Ruta
      :rutas="[
        {
          to: {
            name: 'pasarela',
          },
          texto: 'Pasarela de pago',
        },
      ]"
    />
    <div class="container-lg px-4 px-lg-0 mt-5">
      <DetallesPedido
        @actualizarProductos="$emit('actualizarProductos')"
      ></DetallesPedido>
    </div>
  </main>
</template>
