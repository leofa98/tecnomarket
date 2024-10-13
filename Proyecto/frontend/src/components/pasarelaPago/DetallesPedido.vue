<script>
import { jwtDecode } from 'https://unpkg.com/jwt-decode@4.0.0?module';
import { push } from 'notivue';
import router from '../../router';
import FormularioPedido from './FormularioPedido.vue';
import AccesoDenegado from '@/components/generales/AccesoDenegado.vue';
export default {
  emits: ['actualizarProductos'],
  components: {
    FormularioPedido,
    AccesoDenegado,
  },
  data() {
    return {
      nombre: '',
      apellidos: '',
      direccion: '',
      tlf: '',
      productosCarrito: [],
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
          })
          .catch((error) => {
            console.error(error);
          });

        localStorage.removeItem('carrito');
      } else if (localStorage.getItem('carrito')) {
        this.productosCarrito = JSON.parse(localStorage.getItem('carrito'));
      }
    },
    crearPedido() {
      return fetch(this.backend + '/pedido/crear', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          idUsuario: this.usuario.id,
          gastosEnvio: this.gastosEnvio,
        }),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error(response.status);
          }

          return response.json();
        })
        .then((data) => {
          this.anhadirProductosPedido(data.idPedido);
        })
        .catch((error) => {
          console.error(error);
        });
    },

    anhadirProductosPedido(idPedido) {
      for (const productoCarrito of this.productosCarrito) {
        fetch(
          `${this.backend}/productopedido/crear/${idPedido}/${productoCarrito.producto.id}`,
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              cantidad: productoCarrito.cantidad,
              precio: productoCarrito.producto.precio,
              descuento: productoCarrito.producto.descuento,
            }),
          }
        )
          .then((response) => {
            if (!response.ok) {
              throw new Error(response.status);
            }
          })
          .catch((error) => {
            console.error(error);
          });
      }
    },

    eliminarProductosCarrito() {
      return fetch(`${this.backend}/carrito/eliminar/usuario`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          idUsuario: this.usuario.id,
        }),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error(response.status);
          }
        })
        .catch((error) => {
          console.error(error);
        });
    },
    confirmarPedido() {
      this.crearPedido().then(() => {
        push.success({ message: 'Su pedido se ha confirmado con éxito' });
        this.eliminarProductosCarrito().then(() => {
          router.push('/');
          this.$emit('actualizarProductos');
        });
      });
    },
  },

  computed: {
    usuario() {
      return this.token ? jwtDecode(this.token) : '';
    },
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

    gastosEnvio() {
      return this.total > 50 ? 0 : 5;
    },
  },
};
</script>
<template>
  <div v-if="usuario" class="row">
    <FormularioPedido
      @confirmarPedido="confirmarPedido"
      v-model:nombre="nombre"
      v-model:apellidos="apellidos"
      v-model:direccion="direccion"
      v-model:tlf="tlf"
    ></FormularioPedido>
    <div class="mt-3 mt-md-0 col-lg-6">
      <div class="detalles-pasarela py-5 px-4 px-sm-5">
        <h3 class="mb-4">Tu Pedido</h3>
        <h5 class="mb-3"><b>Productos</b></h5>
        <div
          v-for="productoCarrito in productosCarrito"
          class="d-flex justify-content-between"
        >
          <p>
            x{{ productoCarrito.cantidad }}
            {{ productoCarrito.producto.nombre }}
          </p>
          <p class="ms-3">
            <b>
              {{
                (
                  (productoCarrito.producto.precio -
                    (productoCarrito.producto.precio / 100) *
                      productoCarrito.producto.descuento) *
                  productoCarrito.cantidad
                ).toFixed(2)
              }}€</b
            >
          </p>
        </div>

        <div class="d-flex justify-content-between">
          <p><b>Gastos de envío</b></p>
          <p>
            <b>{{ gastosEnvio }}€</b>
          </p>
        </div>
        <div
          class="mt-5 d-flex justify-content-between align-items-center total"
        >
          <p><b>Total</b></p>
          <p>
            <b>{{ Number(total.toFixed(2)) + gastosEnvio }}€</b>
          </p>
        </div>
        <h5 class="mb-3 mt-2"><b>Métodos de pago</b></h5>
        <div>
          <div class="form-check mb-3">
            <input
              class="form-check-input"
              type="radio"
              name="metodo-pago"
              id="metodo-1"
            />

            <label class="form-check-label" for="metodo-1"
              >Tarjeta de crédito</label
            >
          </div>
          <div class="form-check mb-3">
            <input
              class="form-check-input"
              type="radio"
              name="metodo-pago"
              id="metodo-2"
            />
            <label class="form-check-label" for="metodo-2"
              >Transferencia bancaria</label
            >
          </div>
          <div class="form-check">
            <input
              class="form-check-input"
              type="radio"
              name="metodo-pago"
              id="metodo-3"
            />
            <label class="form-check-label" for="metodo-3">Paypal</label>
            <div></div>
          </div>
          <button @click="confirmarPedido" class="btn-confirmar-carrito mt-4">
            Confirmar pedido
          </button>
        </div>
      </div>
    </div>
  </div>
  <div v-else>
    <AccesoDenegado></AccesoDenegado>
  </div>
</template>

<style scoped>
.detalles-pasarela {
  background-color: white;
  box-shadow: var(--sombra-cajas);
}

.total p:first-of-type {
  font-size: 29px;
}

.btn-confirmar-carrito {
  width: 100%;
  border: none;
  background: var(--degradado-naranja);
  color: white;
  font-weight: bold;
  padding: 0.7em;
  font-size: 18px;
  transition: filter 0.2s ease;
}

.btn-confirmar-carrito:hover {
  filter: brightness(110%);
}
</style>
