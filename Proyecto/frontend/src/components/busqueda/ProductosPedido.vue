<script>
import ProductoPedido from '../generales/ProductoPedido.vue';
import router from '../../router';
import { jwtDecode } from 'https://unpkg.com/jwt-decode@4.0.0?module';
import AccesoDenegado from '@/components/generales/AccesoDenegado.vue';
export default {
  props: ['idPedido'],
  components: {
    ProductoPedido,
    AccesoDenegado,
  },
  data() {
    return {
      productosPedido: [],
      pedido: null,
      token: null,
    };
  },
  mounted() {
    this.token = this.$cookies.get('token');
    this.cargarProductosPedido();
  },
  methods: {
    cargarProductosPedido() {
      fetch(this.backend + '/pedido/productos/' + this.idPedido)
        .then((response) => {
          if (!response.ok) {
            throw new Error(`${response.status} ${response.statusText}`);
          }
          return response;
        })
        .then((data) => data.json())
        .then((data) => {
          this.productosPedido = data;
          this.pedido = this.productosPedido[0].pedido;
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

    usuario() {
      return this.token ? jwtDecode(this.token) : '';
    },
  },
};
</script>
<template>
  <div v-if="usuario && pedido && usuario.id == pedido.usuario.id" class="row">
    <div class="col-md-8 order-2 order-md-1">
      <ProductoPedido
        v-for="productoPedido in productosPedido"
        :productoPedido="productoPedido"
      ></ProductoPedido>
      <hr class="my-4" />
      <p><b>Total:</b> {{ total.toFixed(2) }}€</p>
      <p><b>Gastos de envío: </b>{{ pedido.gastosEnvio }}€</p>
      <hr class="my-4" />
      <p class="precio-final">
        <b>Precio final: </b
        >{{ Number(total.toFixed(2)) + Number(this.pedido.gastosEnvio) }}€
      </p>
    </div>
    <div class="offset-md-1 col-md order-1 order-md-2">
      <div class="datos-pedido">
        <p><b>Estado:</b></p>
        <p class="mb-4">{{ this.pedido.estado }}</p>
        <p><b>Fecha de realización:</b></p>
        <p class="mb-4 mb-md-0">
          {{ new Date(this.pedido.fecha).toLocaleDateString() }}
        </p>
      </div>
    </div>
  </div>
  <div v-else-if="pedido != null">
    <AccesoDenegado></AccesoDenegado>
  </div>
</template>

<style scoped>
.datos-pedido {
  font-size: 18px;
}

.datos-pedido p {
  margin: 0;
}
.precio-final {
  font-size: 25px;
}
</style>
