<script>
import { jwtDecode } from "https://unpkg.com/jwt-decode@4.0.0?module";
import { push } from "notivue";
import AccesoDenegado from "../generales/AccesoDenegado.vue";

export default {
  components: {
    AccesoDenegado,
  },
  data() {
    return {
      token: "",
      usuarios: [],
      filtro: "",
    };
  },

  mounted() {
    this.token = this.$cookies.get("token") ? this.$cookies.get("token") : "";
    this.cargarUsuarios();
  },
  computed: {
    usuarioActual() {
      return this.token ? jwtDecode(this.token) : "";
    },
    usuariosFiltrados() {
      return this.usuarios.filter(
        (usuario) =>
          usuario.nomUsuario
            .toUpperCase()
            .includes(this.filtro.toUpperCase()) ||
          usuario.nombre.toUpperCase().includes(this.filtro.toUpperCase()) ||
          usuario.apellidos.toUpperCase().includes(this.filtro.toUpperCase())
      );
    },
  },
  methods: {
    editarUsuario(e) {
      let admin =
        e.target.id == "admin"
          ? e.target.checked
          : Boolean(e.target.dataset.admin == "true");
      let activado =
        e.target.id == "activado"
          ? e.target.checked
          : Boolean(e.target.dataset.activado == "true");
      fetch(this.backend + "/usuario/modificar/" + e.target.dataset.id, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: this.token,
        },

        body: JSON.stringify({
          id: e.target.dataset.id,
          nomUsuario: e.target.dataset.nomusuario,
          nombre: e.target.dataset.nombre,
          apellidos: e.target.dataset.apellidos,
          correo: e.target.dataset.correo,
          admin: admin,
          activado: activado,
        }),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error(response.status);
          }
          if (e.target.checked && e.target.id == "activado") {
            push.info("El usuario ha sido activado");
          } else if (!e.target.checked && e.target.id == "activado") {
            push.info("El usuario ha sido desactivado");
          } else if (e.target.checked && e.target.id == "admin") {
            push.info("El usuario ha sido habilitado como administrador");
          } else {
            push.info("El usuario ha sido deshabilitado como administrador");
          }
          this.cargarUsuarios();
        })
        .catch((error) => {
          console.error(error);
        });
    },

    cargarUsuarios() {
      fetch(this.backend + "/usuarios")
        .then((response) => {
          if (!response.ok) {
            throw new Error(response.status);
          }

          return response.json();
        })
        .then((data) => {
          this.usuarios = data;
        })
        .catch((error) => {
          console.error(error);
        });
    },
  },
};
</script>
<template>
  <div v-if="token && usuarioActual.admin">
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
    </div>
    <div class="table-responsive">
      <table class="table table-secondary table-striped">
        <thead class="table-dark">
          <tr>
            <th class="text-center">ID</th>
            <th>Nombre de usuario</th>
            <th>Nombre</th>
            <th>Apellidos</th>
            <th>Correo</th>
            <th class="text-center">Administrador</th>
            <th class="text-center">Activado</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="usuario in usuariosFiltrados" :key="usuario.id">
            <td class="text-center">{{ usuario.id }}</td>

            <td>
              {{
                usuario.nomUsuario.charAt(0).toUpperCase() +
                usuario.nomUsuario.slice(1)
              }}
            </td>
            <td>
              {{
                usuario.nombre.charAt(0).toUpperCase() + usuario.nombre.slice(1)
              }}
            </td>
            <td>{{ usuario.apellidos }}</td>
            <td>{{ usuario.correo }}</td>
            <td class="text-center">
              <div class="form-check d-flex justify-content-center form-switch">
                <input
                  @change="editarUsuario"
                  :data-id="usuario.id"
                  :disabled="usuarioActual.correo == usuario.correo"
                  :data-nomUsuario="usuario.nomUsuario"
                  :data-nombre="usuario.nombre"
                  :data-apellidos="usuario.apellidos"
                  :data-correo="usuario.correo"
                  :data-activado="usuario.activado"
                  class="form-check-input"
                  type="checkbox"
                  role="switch"
                  id="admin"
                  :checked="usuario.admin"
                />
              </div>
            </td>
            <td class="text-center">
              <div class="form-check d-flex justify-content-center form-switch">
                <input
                  @change="editarUsuario"
                  :disabled="usuarioActual.correo == usuario.correo"
                  :data-id="usuario.id"
                  :data-nomUsuario="usuario.nomUsuario"
                  :data-nombre="usuario.nombre"
                  :data-apellidos="usuario.apellidos"
                  :data-correo="usuario.correo"
                  :data-admin="usuario.admin"
                  class="form-check-input"
                  type="checkbox"
                  role="switch"
                  id="activado"
                  :checked="usuario.activado"
                />
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
  <div v-else-if="token == '' || !usuarioActual.admin">
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
  width: 180px;
  transition: filter 0.2s ease;
}
.btn-anhadir-producto:hover {
  filter: brightness(110%);
}
.form-check-input:checked {
  background-color: var(--color-secundario-naranja) !important;
  border-color: var(--color-secundario-naranja) !important;
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
