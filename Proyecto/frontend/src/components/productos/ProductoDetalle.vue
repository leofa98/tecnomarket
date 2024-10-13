<script>
import Estrellas from "../generales/Estrellas.vue";
import { jwtDecode } from "https://unpkg.com/jwt-decode@4.0.0?module";
import { push } from "notivue";

export default {
  props: ["idProducto", "cargarResenhas"],
  emits: ["anhadirProducto"],
  data() {
    return {
      producto: {},
      resenhas: [],
      cantidad: 1,
      token: this.$cookies.get("token"),
    };
  },
  components: {
    Estrellas,
  },
  watch: {
    cargarResenhas() {
      this.cargarProducto();
    },
  },

  mounted() {},
  computed: {
    usuario() {
      return this.token ? jwtDecode(this.token) : "";
    },

    numResenhas() {
      return this.resenhas.length;
    },

    mediaValoraciones() {
      return (
        this.resenhas.reduce((total, resenha) => {
          return (total += Number(resenha.valoracion));
        }, 0) / this.numResenhas
      );
    },
  },
  methods: {
    cargarProducto() {
      fetch(this.backend + "/producto/" + this.idProducto)
        .then((response) => {
          if (!response.ok) {
            throw new Error(`Error: ${response.status}`);
          }
          return response.json();
        })
        .then((data) => {
          this.producto = data;

          return data;
        })
        .then((data) => {
          fetch(this.backend + "/resenhas/" + data.id)
            .then((response) => {
              if (!response.ok) {
                throw new Error(`Error: ${response.status}`);
              }

              return response.json();
            })
            .then((data) => {
              this.resenhas = data;
            })
            .catch((error) => {
              console.error(`Error al obtener los datos: ${error}`);
            });
        })
        .catch((error) => {
          console.error(`Error al obtener los datos: ${error}`);
        });
    },
    anhadirCarrito() {
      if (this.$cookies.get("token")) {
        fetch(
          `${this.backend}/productocarrito/crear/${this.usuario.id}/${this.producto.id}`,
          {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              cantidad: this.cantidad,
            }),
          }
        )
          .then((response) => {
            if (!response.ok) {
              throw new Error(response.status);
            }

            return response.json();
          })
          .then((data) => {
            this.$emit("anhadirProducto");
          })
          .catch((error) => {
            console.error(error);
          });
      } else {
        if (!localStorage.getItem("carrito")) {
          localStorage.setItem("carrito", JSON.stringify([]));
        }

        let carrito = JSON.parse(localStorage.getItem("carrito"));

        if (
          carrito.findIndex(
            (pedido) => pedido.producto.id == this.producto.id
          ) !== -1
        ) {
          carrito[
            carrito.findIndex(
              (pedido) => pedido.producto.id == this.producto.id
            )
          ].cantidad += this.cantidad;
        } else {
          carrito.push({
            producto: this.producto,
            cantidad: this.cantidad,
          });
        }

        localStorage.setItem("carrito", JSON.stringify(carrito));
        this.$emit("anhadirProducto");
      }

      push.info({ message: "Has añadido el producto al carrito" });
    },
  },
};
</script>
<template>
  <div class="producto-detalle py-5 px-4 px-sm-5">
    <h4 class="producto-detalle-nombre mb-4">{{ producto.nombre }}</h4>
    <div class="producto-detalle-precio mb-3">
      <p v-if="producto.descuento !== 0" class="mb-2 producto-precio-descuento">
        {{ producto.precio }}€
      </p>

      <p
        class="producto-detalle-precio-final"
        :class="{ oferta: producto.descuento != 0 }"
      >
        {{
          (
            producto.precio -
            (producto.precio / 100) * producto.descuento
          ).toFixed(2) + "€"
        }}
      </p>
    </div>

    <Estrellas
      class="my-4"
      :numResenhas="numResenhas"
      :mediaValoraciones="mediaValoraciones"
    />
    <p class="my-4"><b>Detalles: </b>{{ producto.descripcion }}</p>
    <div v-if="producto.stock > 0" class="my-4 row">
      <div class="col-auto">
        <label class="col-form-label"><b>Cantidad: </b> </label>
      </div>
      <div class="col-auto">
        <input
          @change="
            cantidad > producto.stock
              ? (cantidad = producto.stock)
              : (cantidad = cantidad);
            cantidad < 0 ? (cantidad = 1) : (cantidad = cantidad);
          "
          v-model.number="cantidad"
          class="form-control"
          id="cantidad"
          type="number"
          min="1"
          :max="producto.stock"
        />
      </div>
    </div>
    <button
      @click="anhadirCarrito"
      v-if="producto.stock > 0 && !usuario.admin"
      class="btn-anhadir-carrito mt-4"
    >
      Añadir al carrito
    </button>
    <p v-if="producto.stock == 0" class="aviso-no-disponible text-danger">
      Este producto no está disponible
    </p>
  </div>
</template>

<style scoped>
.producto-detalle {
  background-color: white;
  box-shadow: var(--sombra-cajas);
  min-height: 500px;
}

.producto-detalle-precio-final {
  font-weight: bold;
  font-size: 23px;
  margin: 0;
}

.producto-precio-descuento {
  margin: 0;
  text-decoration: line-through;
}
.oferta {
  color: var(--color-secundario-naranja);
}

.btn-anhadir-carrito {
  width: 100%;
  border: none;
  background: var(--degradado-naranja);
  color: white;
  font-weight: bold;
  padding: 0.7em;
  font-size: 18px;
  transition: filter 0.2s ease;
}

.btn-anhadir-carrito:hover {
  filter: brightness(110%);
}

.aviso-no-disponible {
  margin: 0;
  text-align: center;
  margin-top: 3em;
  font-weight: bold;
  font-size: 22px;
}
</style>
