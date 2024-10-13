<script>
export default {
  props: ['pedido'],
  data() {
    return {
      productosPedido: [],
    };
  },
  mounted() {
    this.cargarProductosPedido();
  },
  methods: {
    cargarProductosPedido() {
      fetch(this.backend + '/pedido/productos/' + this.pedido.id)
        .then((response) => {
          if (!response.ok) {
            throw new Error(`${response.status} ${response.statusText}`);
          }
          return response;
        })
        .then((data) => data.json())
        .then((data) => {
          this.productosPedido = data;
        })
        .catch((error) => {
          console.error(error);
        });
    },
  },
  computed: {
    total() {
      return this.productosPedido.reduce((accum, valor) => {
        accum += Number(
          (valor.precio - (valor.precio / 100) * valor.descuento) *
            valor.cantidad
        );
        return accum;
      }, 0);
    },
  },
};
</script>
<template>
  <div class="pedido p-4">
    <div class="row">
      <div class="col">
        <p class="m-0"><b>Nº Pedido: </b>{{ pedido.id }}</p>
        <p>{{ new Date(pedido.fecha).toLocaleDateString() }}</p>
        <p><b>Estado: </b>{{ pedido.estado }}</p>
        <p class="m-0">{{ productosPedido.length }} artículos</p>
        <p class="m-0">
          <b>{{ total.toFixed(2) }}€</b>
        </p>
      </div>
      <div class="col d-flex justify-content-end align-items-start">
        <router-link
          class="btn-pedido"
          :to="{
            name: 'pedido',
            params: {
              idPedido: pedido.id,
            },
          }"
          >Ver Pedido</router-link
        >
      </div>
    </div>
  </div>
</template>

<style scoped>
.pedido {
  background-color: white;
  box-shadow: var(--sombra-cajas);
  max-width: 500px;
}

.btn-pedido {
  display: flex;
  justify-content: center;
  align-items: center;
  text-decoration: none;
  border: none;
  width: 95px;
  height: 40px;
  background: var(--degradado-naranja);
  font-weight: bold;
  color: white;
  transition: filter ease 0.2s;
}
.btn-pedido:hover {
  filter: brightness(110%);
}
</style>
