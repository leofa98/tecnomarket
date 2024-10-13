<script>
import { jwtDecode } from "https://unpkg.com/jwt-decode@4.0.0?module";
import { push } from "notivue";
import EliminarProducto from "../modales/EliminarProducto.vue";
import EditarProducto from "../modales/EditarProducto.vue";
import AccesoDenegado from "../generales/AccesoDenegado.vue";
import { Modal } from "bootstrap";

export default {
  props: ["toggle"],
  components: { EliminarProducto, EditarProducto, AccesoDenegado },
  data() {
    return {
      token: "",
      productos: [],
      filtro: "",
      productoEliminar: null,
      productoIdEliminar: null,
      nomProductoEliminar: null,
    };
  },
  watch: {
    toggle() {
      this.cargarProductos();
    },
  },
  mounted() {
    this.token = this.$cookies.get("token");
    this.cargarProductos();
  },
  computed: {
    usuario() {
      return this.token ? jwtDecode(this.token) : "";
    },
    productosFiltrados() {
      return this.productos.filter((producto) =>
        producto.nombre.toUpperCase().includes(this.filtro.toUpperCase())
      );
    },
  },
  methods: {
    cargarProductos() {
      fetch(this.backend + "/productos")
        .then((response) => {
          if (!response.ok) {
            throw new Error(response.status);
          }
          return response.json();
        })
        .then((data) => {
          this.productos = data;
        })
        .catch((error) => {
          console.error(error);
        });
    },
    eliminarProductoModal(id, nombre) {
      this.productoIdEliminar = id;
      this.nomProductoEliminar = nombre;
      this.$nextTick(() => {
        const modalEliminar = new Modal(
          document.getElementById("eliminarProductoModal")
        );
        modalEliminar.show();
      });
    },

    editarProductoModal(producto) {
      this.productoEliminar = producto;
      this.$nextTick(() => {
        const modalEditar = new Modal(
          document.getElementById("editarProductoModal")
        );
        modalEditar.show();
      });
    },
  },
};
</script>

<template>
  <div v-if="token && usuario.admin">
    <div class="row mb-4">
      <div
        class="order-2 order-md-1 col-md-6 col-lg-5 d-flex align-items-center"
      >
        <input
          v-model="filtro"
          type="text"
          class="form-control"
          placeholder="Buscar por nombre"
        />
      </div>

      <div
        class="order-1 order-md-2 pb-3 pb-md-0 me-5 me-md-0 col-md-3 offset-md-3 offset-lg-4 d-flex align-items-center justify-content-md-end text-end"
      >
        <button
          data-bs-toggle="modal"
          data-bs-target="#anhadirProductoModal"
          class="btn-anhadir-producto"
        >
          + Añadir Producto
        </button>
      </div>
    </div>
    <div class="table-responsive">
      <table class="table table-secondary table-striped">
        <thead class="table-dark">
          <tr>
            <th class="text-center">ID</th>
            <th class="text-center">Imagen</th>
            <th class="text-center">Categoría</th>
            <th>Nombre</th>
            <th class="text-center">Stock</th>
            <th class="text-center">Precio</th>
            <th class="text-center">Descuento</th>
            <th class="text-center">Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="producto in productosFiltrados" :key="producto.id">
            <td class="text-center">{{ producto.id }}</td>
            <td class="text-center">
              <img :src="producto.imagen" alt="producto-imagen" />
            </td>
            <td class="text-center">
              {{
                producto.categoria.descripcion.charAt(0).toUpperCase() +
                producto.categoria.descripcion.slice(1)
              }}
            </td>
            <td>{{ producto.nombre }}</td>
            <td class="text-center">{{ producto.stock }} uds.</td>
            <td class="text-center">{{ producto.precio }}€</td>
            <td class="text-center">{{ producto.descuento }}%</td>
            <td class="text-center acciones">
              <button
                @click="eliminarProductoModal(producto.id, producto.nombre)"
              >
                <font-awesome-icon icon="fa-regular fa-trash-can" />
              </button>
              <button @click="editarProductoModal(producto)">
                <font-awesome-icon icon="fa-solid fa-pen-to-square" />
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <Teleport to="body">
      <EliminarProducto
        :nomProducto="nomProductoEliminar"
        :id="productoIdEliminar"
        @cargarProductos="cargarProductos"
      />
      <EditarProducto
        :producto="productoEliminar"
        @cargarProductos="cargarProductos"
      />
    </Teleport>
  </div>
  <div v-else-if="token == '' || !usuario.admin">
    <AccesoDenegado></AccesoDenegado>
  </div>
</template>

<style scoped>
th,
td {
  padding: 1em;
}
.btn-anhadir-producto {
  background: var(--degradado-naranja);
  padding: 0.5em;
  width: 100%;
  border: none;
  color: white;
  font-weight: 600;
  transition: filter 0.2s ease;
}

.btn-anhadir-producto:hover {
  filter: brightness(110%);
}
td > img {
  width: 50px;
}
tr {
  vertical-align: middle;
}
.acciones button {
  background: none;
  border: none;
  font-size: 20px;
  color: var(--gris-oscuro);
  transition: color 0.2s ease;
}

.acciones button:hover {
  color: var(--color-secundario-naranja);
}
th {
  text-wrap: nowrap;
}
</style>
