<script>
import { materialTheme, push } from 'notivue';
import { jwtDecode } from 'https://unpkg.com/jwt-decode@4.0.0?module';
export default {
  props: ['idProducto'],
  emits: ['cargarResenhas'],
  data() {
    return {
      valoracion: 1,
      comentario: '',
      token: this.$cookies.get('token'),
    };
  },
  computed: {
    sesionIniciada() {
      return this.token != null;
    },
    usuario() {
      return this.token ? jwtDecode(this.token) : '';
    },
  },
  methods: {
    enviarResenha() {
      fetch(this.backend + '/resenha/crear/' + this.idProducto, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${this.token}`,
        },
        body: JSON.stringify({
          opinion: this.comentario,
          valoracion: this.valoracion,
          idUsuario: this.usuario.id,
        }),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error(`${response.status} ${response.statusText}`);
          }
          return response;
        })
        .then((data) => data.json())
        .then((data) => {
          this.$emit('cargarResenhas', this.idProducto);
          push.success({ message: data.status });
        })
        .catch((error) => {
          console.error(error);
        });
    },
  },
};
</script>

<template>
  <div>
    <hr />
    <h5 class="mb-4">Déjanos tu opinión sobre este producto:</h5>
    <form
      @submit.prevent="enviarResenha"
      class="form-resenha position-relative"
    >
      <div class="mb-3">
        <label for="valoracion" class="form-label">Valoración: </label>
        <rate
          :length="5"
          :value="valoracion"
          :showcount="true"
          v-model="valoracion"
        />
      </div>
      <div class="mb-3">
        <label for="comentarios" class="form-label">Comentarios: </label>
        <textarea
          v-model="comentario"
          class="form-control"
          name="comentarios"
          id="comentarios"
          cols="30"
          rows="5"
        ></textarea>
      </div>
      <div class="d-flex justify-content-end">
        <button class="btn-enviar" type="submit">Enviar</button>
      </div>
    </form>
  </div>
</template>

<style>
.contenedor-resenhas form {
  max-width: 700px;
}

.btn-enviar {
  border: none;
  width: 95px;
  height: 40px;
  background: var(--degradado-naranja);
  font-weight: bold;
  color: white;
  transition: filter ease 0.2s;
}
.btn-enviar:hover {
  filter: brightness(110%);
}

.Rate__star {
  display: flex;
  padding: 0;
  margin: 0;
  height: auto;
  font-size: 40px;
}
.Rate {
  display: flex;
  align-items: center;
}
.Rate__view {
  height: auto;
}
</style>
