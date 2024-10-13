<template>
  <div>
    <button type="button" @click="toggle" class="btns-usuario-collapse">
      <font-awesome-icon :icon="['fas', 'user']" style="color: #ffffff" />
    </button>
    <Menu :model="items" :popup="true" ref="menu" id="overlay_menu">
      <template #item="{ item, props }">
        <router-link
          v-if="item.route"
          v-slot="{ href, navigate }"
          :to="item.route"
          custom
        >
          <a :href="href" v-bind="props.action" @click="navigate">
            <span :class="item.icon"></span>
            <span class="ms-2">{{ item.label }}</span>
          </a>
        </router-link>

        <a
          v-else
          :data-bs-toggle="item.dataBsToggle"
          :data-bs-target="item.dataBsTarget"
          v-bind="props.action"
        >
          <span :class="item.icon" />
          <span class="ms-2">{{ item.label }}</span>
        </a>
      </template>
    </Menu>
  </div>
</template>

<script>
import Menu from 'primevue/menu';
export default {
  props: ['nombre'],
  components: {
    Menu,
  },
  data() {
    return {};
  },
  methods: {
    toggle(event) {
      this.$refs.menu.toggle(event);
    },
  },
  computed: {
    items() {
      if (!this.nombre) {
        return [
          {
            icon: 'pi pi-sign-in',
            label: 'Iniciar sesión',
            dataBsToggle: 'modal',
            dataBsTarget: '#iniciarSesionModal',
          },
          {
            icon: 'pi pi-user',
            label: 'Registrarse',
            dataBsToggle: 'modal',
            dataBsTarget: '#registrarseModal',
          },
        ];
      } else {
        return [
          {
            icon: 'pi pi-user',
            label: 'Perfil',
            route: '/perfil',
          },
          {
            icon: 'pi pi-sign-out',
            label: 'Cerrar sesión',
            command: () => {
              this.$emit('logout');
            },
          },
        ];
      }
    },
  },
};
</script>

<style>
.btns-usuario-collapse {
  font-size: 25px;
  background: none;
  border: none;
}

@media screen and (max-width: 576px) {
  .btns-usuario-collapse {
    font-size: 20px;
  }
}
#overlay_menu_list {
  padding: 0px;
  margin: 0;
}

#overlay_menu_list * {
  text-decoration: none;
}
#overlay_menu a {
  color: inherit;
}
</style>
