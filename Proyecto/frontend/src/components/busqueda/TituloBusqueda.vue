<script>
export default {
  props: ['busqueda', 'categoria'],
};
</script>
<template>
  <div class="resultados-mensaje mb-5">
    <p>Resultados encontrados para</p>
    <p>
      <b>"{{ busqueda }}"</b>
      <span v-if="categoria">
        en <b>{{ categoria }}</b></span
      >
    </p>
  </div>
</template>

<style scoped>
.resultados-mensaje {
  font-size: 19px;
  margin-top: 1em;
  margin-bottom: 1em;
}

.resultados-mensaje p {
  margin: 0;
  margin-bottom: 0.2em;
}
</style>
