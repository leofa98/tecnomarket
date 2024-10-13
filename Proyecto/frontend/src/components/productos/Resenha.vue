<script>
import Estrellas from '../generales/Estrellas.vue';

export default {
  props: ['resenhaProp'],

  components: {
    Estrellas,
  },
};
</script>
<template>
  <div class="contenedor-resenha mt-4">
    <p class="resenha-usuario mb-2">
      <b>{{ resenhaProp.usuario.nomUsuario }}</b>
    </p>

    <p class="resenha-fecha mb-2">
      {{ new Date(resenhaProp.fecha).toLocaleDateString() }}
    </p>
    <Estrellas :valoracion="resenhaProp.valoracion" />
    <p class="resenha-opinion mt-2">
      {{ resenhaProp.opinion }}
    </p>
  </div>
</template>

<style>
.resenha-fecha {
  font-size: 13px;
}

.contenedor-resenha {
  max-width: 700px;
}

.resenha-opinion {
  word-wrap: break-word;
}
</style>
