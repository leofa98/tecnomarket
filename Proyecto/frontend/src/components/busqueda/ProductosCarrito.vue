<script>
import ProductoCarrito from '../generales/ProductoCarrito.vue';
import { jwtDecode } from 'https://unpkg.com/jwt-decode@4.0.0?module';
export default {
  components: {
    ProductoCarrito,
  },
  emits: ['actualizarProductos'],
  data() {
    return {
      productosCarrito: 0,
      token: '',
    };
  },

  mounted() {
    this.token = this.$cookies.get('token');
    this.cargarProductosCarrito();
  },

  methods: {
    cargarProductosCarrito() {
      if (this.token) {
        fetch(`${this.backend}/carrito/usuario/${this.usuario.id}`)
          .then((response) => {
            if (!response.ok) {
              throw new Error(response.status);
            }

            return response.json();
          })
          .then((data) => {
            this.productosCarrito = data;
            this.$emit('actualizarProductos');
          })
          .catch((error) => {
            console.error(error);
          });

        localStorage.removeItem('carrito');
      } else if (localStorage.getItem('carrito')) {
        this.productosCarrito = JSON.parse(localStorage.getItem('carrito'));
        this.$emit('actualizarProductos');
      } else {
        this.productosCarrito = [];
      }
    },
  },
  computed: {
    total() {
      return this.productosCarrito.reduce((accum, valor) => {
        accum += Number(
          (valor.producto.precio -
            (valor.producto.precio / 100) * valor.producto.descuento) *
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
  <div>
    <div v-if="productosCarrito.length" class="row">
      <div class="col-lg-7">
        <ProductoCarrito
          @actualizarProductos="cargarProductosCarrito"
          v-for="productoCarrito in productosCarrito"
          :productoCarrito="productoCarrito"
        ></ProductoCarrito>
      </div>
      <div class="col-lg-5">
        <div class="detalles-carrito py-4 px-4 px-sm-5">
          <h3>Resumen</h3>
          <div class="d-flex justify-content-between my-4">
            <p><b>Subtotal: </b></p>
            <p>{{ total.toFixed(2) }}€</p>
          </div>
          <hr class="mb-4" />
          <router-link
            :to="{
              name: 'pasarela',
            }"
            v-if="token"
            class="btn-finalizar-compra d-block text-center text-decoration-none"
          >
            Finalizar compra
          </router-link>

          <p v-else role="button" class="text-center">
            <b data-bs-toggle="modal" data-bs-target="#iniciarSesionModal"
              >Inicia sesión </b
            >para realizar el pedido
          </p>
        </div>
      </div>
    </div>
    <div v-else-if="Array.isArray(productosCarrito)" class="container-lg mt-5">
      <div class="alert alert-danger text-center" role="alert">
        No hay productos en el carrito
      </div>
    </div>
  </div>
</template>
<style scoped>
.detalles-carrito {
  background-color: white;
  width: 100%;
  box-shadow: var(--sombra-cajas);
}
.btn-finalizar-compra {
  width: 100%;
  border: none;
  background: var(--degradado-naranja);
  color: white;
  font-weight: bold;
  padding: 1em;
  font-size: 18px;
  transition: filter 0.2s ease;
}

.btn-finalizar-compra:hover {
  filter: brightness(110%);
}
</style>
