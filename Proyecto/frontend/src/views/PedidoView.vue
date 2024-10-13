<script setup>
import ProductosPedido from '@/components/busqueda/ProductosPedido.vue';
import Ruta from '@/components/navegacion/Ruta.vue';
</script>

<template>
  <main>
    <Ruta
      :rutas="[
        { to: { name: 'perfil' }, texto: 'Perfil' },
        {
          to: {
            name: 'pedido',
            params: { idPedido: $route.params.idPedido },
          },
          texto: 'Pedido',
        },
      ]"
    />

    <div class="container-lg px-4 px-lg-0">
      <h3 class="my-4">
        <b>Detalles del pedido #{{ $route.params.idPedido }}</b>
      </h3>

      <ProductosPedido :idPedido="$route.params.idPedido"></ProductosPedido>
    </div>
  </main>
</template>
