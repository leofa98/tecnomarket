<script>
export default {
  props: ['titulo'],
};
</script>
<template>
  <h2 class="titulo-pagina">
    {{ titulo }}
  </h2>
</template>

<style scoped>
.titulo-pagina {
  padding: 0.2em 0.8em 0.2em 0.5em;
  margin-bottom: 1.2em;
  margin-top: 1em;
  border-left: solid 6px var(--color-secundario-naranja);
  background: transparent;
  font-size: 38px;
  font-weight: bold;
}
</style>
