<script>
import { push } from 'notivue';

export default {
  emits: ['login'],
  data() {
    return {
      correo: '',
      contrasenha: '',
    };
  },

  methods: {
    iniciarSesion() {
      fetch(this.backend + '/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          correo: this.correo,
          contrasenha: this.contrasenha,
        }),
      })
        .then((response) => {
          if (!response.ok) {
            return response.json().then((response) => {
              throw new Error(response.error);
            });
          }

          return response.json();
        })
        .then((response) => {
          push.success({
            message: response.status,
          });
          this.reiniciar();
          this.$cookies.set(
            'token',
            response.token,
            null,
            '/',
            import.meta.env.HOST,
            true,
            'Strict'
          );

          document.getElementById('btn-cerrar-login').click();
          this.$emit('login');
        })
        .catch((error) => {
          this.$refs.contrasenha.blur();
          push.error({ message: `${error}`.slice(6) });
        });
    },
    reiniciar() {
      this.correo = '';
      this.contrasenha = '';
    },
  },
};
</script>
<template>
  <div class="modal fade" id="iniciarSesionModal" tabindex="-1">
    <div class="modal-dialog rounded-0">
      <div class="modal-content">
        <div class="modal-header border-0 d-block">
          <div class="text-end">
            <button
              id="btn-cerrar-login"
              type="button"
              data-bs-dismiss="modal"
              class="btn-close"
            ></button>
          </div>
          <h1 class="modal-title fs-5 text-center">Iniciar Sesión</h1>
        </div>
        <div class="modal-body px-4 px-sm-5">
          <form @submit.prevent="iniciarSesion">
            <div class="mb-3">
              <label for="login-correo" class="form-label"
                >Correo electrónico:</label
              >
              <input
                required
                v-model="correo"
                type="email"
                class="form-control-lg form-control"
                id="login-correo"
                autocomplete="username"
              />
            </div>
            <div class="mb-3">
              <label for="login-contrasenha" class="form-label"
                >Contraseña:</label
              >
              <input
                required
                ref="contrasenha"
                v-model="contrasenha"
                type="password"
                class="form-control-lg form-control"
                id="login-contrasenha"
                autocomplete="current-password"
              />
            </div>
            <div class="text-center recuperar-contrasenha">
              <a href="#"><b>¿Has olvidado tu contraseña?</b></a>
            </div>

            <button type="submit" class="btn-acceder mb-3 w-100 mt-3">
              Acceder
            </button>
          </form>

          <div class="separador mb-3">O conéctate con</div>

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
.btn-acceder {
  background-color: var(--gris-oscuro);
  border: 0;
  height: 2.7em;
  color: white;
  font-weight: bold;
  font-size: 18px;
  transition: opacity 0.2s ease;
}

.btn-acceder:hover {
  opacity: 85%;
}

.separador {
  display: flex;
  font-size: 15px;
  align-items: center;
  color: var(--gris);
}
.recuperar-contrasenha a {
  color: var(--gris-oscuro);
  text-decoration: none;
}
.separador::before,
.separador::after {
  flex: 1;
  content: '';
  padding: 0.3px;
  background-color: var(--gris-claro);
  margin: 10px;
}
#iniciarSesionModal {
  color: var(--gris-oscuro);
}
#iniciarSesionModal .modal-title {
  font-size: 28px !important;
}

#iniciarSesionModal input {
  border-radius: 0px;
}

#iniciarSesionModal .modal-content {
  border-radius: 0px !important;
}
</style>
