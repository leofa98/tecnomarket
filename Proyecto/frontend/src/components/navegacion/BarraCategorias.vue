<script>
export default {};
</script>
<template>
  <div class="barra-categorias d-lg-flex d-none mt-3 justify-content-evenly">
    <router-link
      class="pb-2"
      :class="{
        activo: $route.params.nomCategoria == 'ordenadores',
      }"
      :to="{
        name: 'categoria',
        params: { nomCategoria: 'ordenadores' },
      }"
      >Ordenadores
    </router-link>
    <router-link
      :class="{
        activo: $route.params.nomCategoria == 'smartphones',
      }"
      class="pb-2"
      :to="{
        name: 'categoria',
        params: { nomCategoria: 'smartphones' },
      }"
      >Smartphones
    </router-link>
    <router-link
      :class="{
        activo: $route.params.nomCategoria == 'componentes',
      }"
      class="pb-2"
      :to="{
        name: 'categoria',
        params: { nomCategoria: 'componentes' },
      }"
      >Componentes
    </router-link>
    <router-link
      :class="{
        activo: $route.params.nomCategoria == 'televisores',
      }"
      class="pb-2"
      :to="{
        name: 'categoria',
        params: { nomCategoria: 'televisores' },
      }"
      >Televisores
    </router-link>

    <router-link
      :class="{
        activo: $route.params.nomCategoria == 'monitores',
      }"
      class="pb-2"
      :to="{
        name: 'categoria',
        params: { nomCategoria: 'monitores' },
      }"
      >Monitores
    </router-link>
    <router-link
      :class="{
        activo: $route.params.nomCategoria == 'cámaras',
      }"
      class="pb-2"
      :to="{
        name: 'categoria',
        params: { nomCategoria: 'cámaras' },
      }"
      >Cámaras
    </router-link>
    <router-link
      :class="{
        activo: $route.params.nomCategoria == 'audio',
      }"
      class="pb-2"
      :to="{
        name: 'categoria',
        params: { nomCategoria: 'audio' },
      }"
      >Audio
    </router-link>
    <router-link
      :class="{
        activo: $route.params.nomCategoria == 'videojuegos',
      }"
      class="pb-2"
      :to="{
        name: 'categoria',
        params: { nomCategoria: 'videojuegos' },
      }"
      >Videojuegos
    </router-link>
  </div>
</template>

<style scoped>
a {
  color: white;
  text-decoration: none;
  transition: border 0.1s ease;
}
.barra-categorias a:hover {
  box-sizing: border-box;
  border-bottom: var(--color-secundario-naranja) solid 4px;
}

.barra-categorias a {
  border-bottom: var(--gris-oscuro) solid 4px;
}

.activo {
  border-bottom: var(--color-secundario-naranja) solid 4px !important;
}
</style>
