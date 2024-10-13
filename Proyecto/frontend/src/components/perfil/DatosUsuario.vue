<script>
export default {
  props: ['usuario'],
};
</script>
<template>
  <div class="datos-usuario mt-4 mt-md-2">
    <p><b>Nombre de usuario: </b> {{ usuario.nomUsuario }}</p>

    <p><b>Nombre: </b>{{ usuario.nombre }}</p>

    <p><b>Apellidos: </b>{{ usuario.apellidos }}</p>

    <p><b>Correo Electrónico: </b>{{ usuario.correo }}</p>
  </div>
</template>

<style scoped>
.datos-usuario p {
  margin-bottom: 2em;
}

.datos-usuario button {
  border: none;
  width: 95px;
  height: 40px;
  border-radius: 7px;
  background-color: var(--color-secundario-naranja);
  color: white;
  transition: background ease 0.2s;
}

.datos-usuario button:hover {
  background-color: var(--naranja-oscuro);
}
</style>
