<template>
  <footer class="mt-5">
    <div class="container-lg px-4 px-md-0 pt-2">
      <div class="row g-md-5">
        <div
          class="col-md-4 mb-4 mb-md-none px-5 py-lg-0 p-md-4 px-lg-4 align-content-center"
        >
          <img src="/img/logo-blanco.png" class="img-fluid" alt="logo-footer" />
        </div>
        <div class="footer-col col col-md-2 offset-lg-1">
          <h5>Información</h5>
          <a href="#">Sobre Nosotros</a>
          <a href="#">Contacto</a>
          <a href="#">Política de privacidad</a>
        </div>

        <div class="footer-col col col-md-2">
          <h5>Categorías</h5>
          <router-link
            :to="{ name: 'categoria', params: { nomCategoria: 'Ordenadores' } }"
            >Ordenadores</router-link
          >
          <router-link
            :to="{
              name: 'categoria',
              params: { nomCategoria: 'Smartphones' },
            }"
            >Smartphones</router-link
          >
          <router-link
            :to="{
              name: 'categoria',
              params: { nomCategoria: 'Televisores' },
            }"
            >Televisores</router-link
          >
          <router-link
            :to="{
              name: 'categoria',
              params: { nomCategoria: 'Componentes' },
            }"
            >Componentes</router-link
          >
        </div>

        <div class="footer-col col-md-2">
          <h5>Síguenos</h5>
          <div class="redes">
            <a href="#"><font-awesome-icon icon="fa-brands fa-x-twitter" /></a>
            <a href="#"><font-awesome-icon icon="fa-brands fa-whatsapp" /></a>
            <a href="#"><font-awesome-icon icon="fa-brands fa-instagram" /></a>
            <a href="#"><font-awesome-icon icon="fa-brands fa-facebook-f" /></a>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>
<script>
export default {};
</script>
<style>
.footer-col {
  display: flex;
  flex-direction: column;
  justify-content: justify-space-evenly;
  row-gap: 0.5em;
  font-size: 15px;
}

footer {
  background-color: var(--gris-oscuro);
  color: white;
  padding-top: 1.5em;
  padding-bottom: 1.5em;
  margin-top: auto;
}

footer a {
  color: white;
  text-decoration: none;
}
footer a:hover {
  text-decoration: underline;
}

.redes {
  font-size: 25px;
  display: flex;
  column-gap: 1em;
}
.redes a:hover {
  transition: transform ease 0.2s;
}

.redes a:hover {
  transform: scale(1.1);
}

.footer-col h5 {
  padding-left: 0.5em;
  border-left: solid 3px var(--color-secundario-naranja);
}
</style>
