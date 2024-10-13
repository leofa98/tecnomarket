<script>
import TituloPagina from '@/components/generales/TituloPagina.vue';
import Ruta from '@/components/navegacion/Ruta.vue';
import { jwtDecode } from 'https://unpkg.com/jwt-decode@4.0.0?module';
import Botones from '@/components/perfil/Botones.vue';
import DatosUsuario from '@/components/perfil/DatosUsuario.vue';
import PedidosUsuario from '@/components/perfil/PedidosUsuario.vue';
import AccesoDenegado from '@/components/generales/AccesoDenegado.vue';
export default {
  components: {
    TituloPagina,
    Ruta,
    Botones,
    DatosUsuario,
    PedidosUsuario,
    AccesoDenegado,
  },
  data() {
    return {
      token: null,
      componente: 'DatosUsuario',
    };
  },
  methods: {
    cambiarComponente(componente) {
      this.componente = componente;
    },
  },
  mounted() {
    this.token = this.$cookies.get('token');
  },
  computed: {
    usuario() {
      return this.token ? jwtDecode(this.token) : '';
    },
  },
};
</script>
<template>
  <main>
    <Ruta
      :rutas="[
        {
          to: {
            name: 'perfil',
          },
          texto: 'Perfil',
        },
      ]"
    />

    <div class="container-lg px-4 px-lg-0">
      <div v-if="usuario">
        <TituloPagina :titulo="usuario.nomUsuario" />
        <div class="row g-3">
          <div class="col-lg-4">
            <Botones @cambiarComponente="cambiarComponente" />
          </div>
          <div class="col-lg">
            <component :usuario="usuario" :is="componente"></component>
          </div>
        </div>
      </div>
      <div v-else class="mt-5">
        <AccesoDenegado></AccesoDenegado>
      </div>
    </div>
  </main>
</template>

<style></style>
