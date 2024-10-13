<script>
import { push } from 'notivue';
export default {
  data() {
    return {
      nomUsuario: '',
      nombre: '',
      apellidos: '',
      correo: '',
      contrasenha: '',
      error: '',
    };
  },

  methods: {
    registrarse() {
      fetch(this.backend + '/usuario/crear', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nomUsuario: this.nomUsuario,
          nombre: this.nombre,
          apellidos: this.apellidos,
          correo: this.correo,
          contrasenha: this.contrasenha,
          admin: 0,
        }),
      })
        .then((response) => {
          if (!response.ok) {
            return response.json().then((response) => {
              throw new Error(response.error);
            });
          }
        })
        .then(() => {
          push.success({
            message: 'Su cuenta ha sido creada correctamente',
          });
          this.reiniciar();
          document.getElementById('btn-cerrar-registro').click();
        })
        .catch((error) => {
          console.error(error);
          push.error({ message: `${error}`.slice(6) });
        });
    },

    reiniciar() {
      this.nomUsuario = '';
      this.nombre = '';
      this.apellidos = '';
      this.correo = '';
      this.contrasenha = '';
      this.error = '';
    },
  },
};
</script>
<template>
  <div class="modal fade" id="registrarseModal" tabindex="-1">
    <div class="modal-dialog modal-lg rounded-0">
      <div class="modal-content">
        <div class="modal-header border-0 d-block">
          <div class="text-end">
            <button
              id="btn-cerrar-registro"
              type="button"
              data-bs-dismiss="modal"
              class="btn-close"
            ></button>
          </div>
          <h1 class="modal-title fs-5 text-center">Regístrate</h1>
        </div>
        <div class="modal-body px-4 px-sm-5">
          <form @submit.prevent="registrarse">
            <div class="row">
              <div class="mb-3">
                <label for="signup-usuario" class="form-label"
                  >Nombre de usuario:</label
                >
                <input
                  v-model="nomUsuario"
                  required
                  type="text"
                  class="form-control form-control-lg"
                  id="signup-usuario"
                />
              </div>
              <div class="mb-3 col-lg-6">
                <label for="signup-nombre" class="form-label">Nombre:</label>
                <input
                  v-model="nombre"
                  required
                  type="text"
                  class="form-control form-control-lg"
                  id="signup-nombre"
                />
              </div>
              <div class="mb-3 col-lg-6">
                <label for="signup-apellidos" class="form-label"
                  >Apellidos:</label
                >
                <input
                  v-model="apellidos"
                  required
                  type="text"
                  class="form-control form-control-lg"
                  id="signup-apellidos"
                />
              </div>
              <div class="mb-3 col-lg-6">
                <label for="signup-correo" class="form-label"
                  >Correo electrónico:</label
                >

                <input
                  v-model="correo"
                  required
                  type="email"
                  class="form-control form-control-lg"
                  id="signup-correo"
                  autocomplete="username"
                />
              </div>
              <div class="mb-3 col-lg-6">
                <label for="signup-contrasenha" class="form-label"
                  >Contraseña:</label
                >
                <input
                  v-model="contrasenha"
                  required
                  type="password"
                  class="form-control form-control-lg"
                  id="signup-contrasenha"
                  autocomplete="current-password"
                />
              </div>
            </div>
            <button type="submit" class="btn-registro mb-3 w-100 mt-3">
              Registrarse
            </button>
          </form>

          <div class="separador mb-3">O regístrate con</div>

          <div class="w-50 mx-auto mb-3 d-flex justify-content-evenly">
            <img src="/img/redes/google.png" alt="google-logo" />
            <img src="/img/redes/facebook.png" alt="google-logo" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
.btn-registro {
  background: var(--degradado-naranja);
  border: 0;
  height: 2.7em;
  color: white;
  font-weight: bold;
  font-size: 18px;
  transition: filter 0.2s ease;
}

.btn-registro:hover {
  filter: brightness(110%);
}

.separador {
  display: flex;
  font-size: 15px;
  align-items: center;
  color: var(--gris);
}

.separador::before,
.separador::after {
  flex: 1;
  content: '';
  padding: 0.3px;
  background-color: var(--gris-claro);
  margin: 10px;
}

#registrarseModal .modal-title {
  font-size: 28px !important;
}

#registrarseModal input {
  border-radius: 0px;
}

#registrarseModal .modal-content {
  border-radius: 0px !important;
}
</style>
