<script>
export default {
  props: ['productoPedido'],
};
</script>
<template>
  <router-link
    :to="{
      name: 'producto',
      params: {
        nomProducto: productoPedido.producto.nombre,
        nomCategoria: productoPedido.producto.categoria.descripcion,
        idProducto: productoPedido.producto.id,
      },
    }"
    class="d-block producto-pedido mb-3 py-2 px-4"
  >
    <div class="row">
      <div class="col-2 p-2">
        <img
          height="70px"
          :src="productoPedido.producto.imagen"
          alt="img-pedido"
        />
      </div>
      <div class="col-10 col-md-6 d-flex align-items-center order-4 order-md-2">
        <p class="m-0 mt-1 m-md-0">{{ productoPedido.producto.nombre }}</p>
      </div>
      <div
        class="col-8 col-md-2 d-flex align-items-center flex-column justify-content-center order-md-3"
      >
        <p v-if="productoPedido.descuento" class="m-0 precio-original">
          {{ productoPedido.precio }}€
        </p>
        <p
          :class="{ descuentoProductoPedido: productoPedido.descuento }"
          class="m-0 precio"
        >
          <b
            >{{
              (
                productoPedido.precio -
                (productoPedido.precio / 100) * productoPedido.descuento
              ).toFixed(2)
            }}€</b
          >
        </p>
      </div>
      <div
        class="col-2 col-md-2 cantidad d-flex align-items-center justify-content-end justify-content-md-center order-md-4"
      >
        X{{ productoPedido.cantidad }}
      </div>
    </div>
  </router-link>
</template>

<style scoped>
.producto-pedido {
  width: 100%;
  background-color: white;
  box-shadow: var(--sombra-cajas);
  text-decoration: none;
  color: unset;
}
.precio {
  font-size: 18px;
}

.descuentoProductoPedido {
  color: var(--color-secundario-naranja);
}
.precio-original {
  text-decoration: line-through;
  font-size: 13px;
}
.cantidad {
  font-size: 20px;
}
</style>
