<script>
import BotonHamburguesa from './BotonHamburguesa.vue';
export default {
  data() {
    return {
      active: false,
    };
  },
  components: {
    BotonHamburguesa,
  },

  methods: {
    toggleSidebar() {
      this.active = !this.active;
      if (this.active) {
        document.documentElement.style.overflow = 'hidden';
      } else {
        document.documentElement.style.overflow = 'auto';
      }
    },
  },
};
</script>
<template>
  <div>
    <div class="sidebar" :class="{ 'sidebar-activo': active }">
      <div @click="toggleSidebar" class="sidebar-content pb-5">
        <div class="sidebar-section">
          <router-link
            :to="{
              name: 'categoria',
              params: { nomCategoria: 'ordenadores' },
            }"
            >Ordenadores
          </router-link>
        </div>
        <div class="sidebar-section">
          <router-link
            :to="{
              name: 'categoria',
              params: { nomCategoria: 'smartphones' },
            }"
            >Smartphones
          </router-link>
        </div>
        <div class="sidebar-section">
          <router-link
            :to="{
              name: 'categoria',
              params: { nomCategoria: 'componentes' },
            }"
            >Componentes
          </router-link>
        </div>
        <div class="sidebar-section">
          <router-link
            :to="{
              name: 'categoria',
              params: { nomCategoria: 'televisores' },
            }"
            >Televisores
          </router-link>
        </div>
        <div class="sidebar-section">
          <router-link
            :to="{
              name: 'categoria',
              params: { nomCategoria: 'monitores' },
            }"
            >Monitores
          </router-link>
        </div>
        <div class="sidebar-section">
          <router-link
            :to="{
              name: 'categoria',
              params: { nomCategoria: 'cámaras' },
            }"
            >Cámaras
          </router-link>
        </div>
        <div class="sidebar-section">
          <router-link
            :to="{
              name: 'categoria',
              params: { nomCategoria: 'audio' },
            }"
            >Audio
          </router-link>
        </div>
      </div>
    </div>
    <div class="overlay" :class="{ 'overlay-activo': active }"></div>
  </div>
  <BotonHamburguesa @toggleSidebar="toggleSidebar" :active="active" />
</template>

<style scoped>
.sidebar-activo {
  transform: translateX(1000px);
}
.overlay-activo {
  visibility: visible !important;
}
.sidebar {
  padding: 10px;
  position: fixed;
  top: 0;

  left: -1000px;
  width: 350px;
  height: 100vh;
  z-index: 200;
  background-color: white;
  overflow: scroll;
  transition: all 0.2s ease;
}
.sidebar-content a {
  color: var(--color-fondo-seccion);
  text-decoration: none;
}

.sidebar-section {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 80px;
  font-size: 20px;
  font-weight: bold;
  border-bottom: var(--gris-claro) 2px solid;
}
.sidebar-exit {
  border: none;
  background: transparent;
  font-size: 30px;
}

.overlay {
  top: 0;
  right: 0;
  visibility: hidden;
  position: fixed;
  width: 100vw;
  border: 3px;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.7);
  z-index: 100;
}
</style>
