<script>
export default {
  props: ['rutas'],
};
</script>
<template>
  <div class="container-xl px-4 px-xl-0">
    <nav aria-label="breadcrumb">
      <ol class="breadcrumb">
        <li class="breadcrumb-item">
          <router-link :to="{ name: 'home' }"
            ><font-awesome-icon icon="fa-solid fa-house"
          /></router-link>
        </li>
        <li v-for="ruta in rutas" class="breadcrumb-item">
          <router-link :to="ruta.to">
            {{
              ruta.texto.charAt(0).toUpperCase() + ruta.texto.slice(1)
            }}</router-link
          >
        </li>
      </ol>
    </nav>
  </div>
  <hr class="mb-4" />
</template>

<style scoped>
ol,
hr {
  margin: 0 !important;

  font-size: 14px;
}
nav {
  padding-top: 0.7em;
  padding-bottom: 0.5em;
}

a {
  text-decoration: none;
  color: gray;
}

a:hover {
  text-decoration: underline;
}
</style>
