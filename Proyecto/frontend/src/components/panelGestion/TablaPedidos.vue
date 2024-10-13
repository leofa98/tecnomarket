<script>
import { jwtDecode } from 'https://unpkg.com/jwt-decode@4.0.0?module';
import { push } from 'notivue';
import ModificarEstado from '../modales/ModificarEstado.vue';
import AccesoDenegado from '../generales/AccesoDenegado.vue';
import { Modal } from 'bootstrap';
export default {
  components: {
    AccesoDenegado,
    ModificarEstado,
  },
  data() {
    return {
      token: '',
      pedidos: [],
      filtroUsuario: '',
      filtroEstado: '',
      pedidoModificar: null,
      pedidoModificarEstado: null,
    };
  },

  mounted() {
    this.token = this.$cookies.get('token');
    this.cargarPedidos();
  },
  computed: {
    usuario() {
      return this.token ? jwtDecode(this.token) : '';
    },
    pedidosFiltrados() {
      return this.pedidos.filter((pedido) => {
        return (
          (pedido.usuario.nomUsuario
            .toUpperCase()
            .includes(this.filtroUsuario.toUpperCase()) ||
            (pedido.usuario.nombre + ' ' + pedido.usuario.apellidos)
              .toUpperCase()
              .includes(this.filtroUsuario.toUpperCase())) &&
          pedido.estado.includes(this.filtroEstado)
        );
      });
    },
  },
  methods: {
    cargarPedidos() {
      fetch(this.backend + '/pedidos', {
        headers: {
          'Content-Type': 'application/json',
          Authorization: this.token,
        },
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error(response.status);
          }

          return response.json();
        })
        .then((data) => {
          this.pedidos = data;
        })
        .catch((error) => {
          console.error(error);
        });
    },
    modificarPedidoModal(id, estado) {
      this.pedidoModificar = id;
      this.pedidoModificarEstado = estado;
      this.$nextTick(() => {
        const modalModificarEstado = new Modal(
          document.getElementById('modificarEstadoPedido')
        );
        modalModificarEstado.show();
      });
    },
  },
};
</script>
<template>
  <div v-if="token && usuario.admin">
    <div class="row mb-4">
      <div class="col-md-6 col-lg-5 d-flex align-items-center">
        <input
          v-model="filtroUsuario"
          type="text"
          class="form-control mb-3 mb-md-0"
          placeholder="Buscar por usuario"
        />
      </div>
      <div class="col-md-4 col-lg-3">
        <select
          v-model="filtroEstado"
          name="filtroEstado"
          class="form-select"
          id=""
        >
          <option disabled selected value="">--- Buscar por estado ---</option>
          <option value="">Todos</option>
          <option value="Pendiente">Pendientes</option>
          <option value="Enviado">Enviados</option>
          <option value="Entregado">Entregados</option>
        </select>
      </div>
    </div>
    <div class="table-responsive">
      <table class="table table-secondary table-striped">
        <thead class="table-dark">
          <tr>
            <th class="text-center">ID</th>
            <th>Usuario</th>
            <th>Nombre</th>
            <th>Apellidos</th>
            <th>Fecha</th>
            <th class="col-estado">Estado</th>
            <th class="text-center">Gastos envío</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="pedido in pedidosFiltrados" :key="pedido.id">
            <td class="text-center">{{ pedido.id }}</td>

            <td>
              {{ pedido.usuario.nomUsuario }}
            </td>
            <td>
              {{ pedido.usuario.nombre }}
            </td>
            <td>
              {{ pedido.usuario.apellidos }}
            </td>
            <td>
              {{ new Date(pedido.fecha).toLocaleDateString() }}
            </td>
            <td>
              <button
                @click="modificarPedidoModal(pedido.id, pedido.estado)"
                :class="{ 'd-none': pedido.estado != 'Pendiente' }"
                class="btn btn-warning"
              >
                Pendiente
              </button>
              <button
                @click="modificarPedidoModal(pedido.id, pedido.estado)"
                :class="{ 'd-none': pedido.estado != 'Enviado' }"
                class="btn btn-primary"
              >
                Enviado
              </button>
              <button
                @click="modificarPedidoModal(pedido.id, pedido.estado)"
                :class="{ 'd-none': pedido.estado != 'Entregado' }"
                class="btn btn-success"
              >
                Entregado
              </button>
            </td>
            <td class="text-center">{{ pedido.gastosEnvio }}€</td>
          </tr>
        </tbody>
      </table>
    </div>

    <Teleport to="body">
      <ModificarEstado
        :id="pedidoModificar"
        :estadoActual="pedidoModificarEstado"
        @cargarPedidos="cargarPedidos"
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

tr {
  vertical-align: middle;
}

th {
  text-wrap: nowrap;
}

td button {
  border-radius: 0px;
  width: 110px;
  height: 2.5em;
}
</style>
