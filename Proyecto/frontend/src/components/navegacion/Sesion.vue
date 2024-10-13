<script>
import { jwtDecode } from 'https://unpkg.com/jwt-decode@4.0.0?module';
import { push } from 'notivue';
import IniciarSesion from '../modales/IniciarSesion.vue';
import Registrarse from '../modales/Registrarse.vue';
import BotonesInvitado from '../modales/BotonesInvitado.vue';
import BotonesUsuario from '../modales/BotonesUsuario.vue';
import MenuUsuario from '../modales//MenuUsuario.vue';
import router from '../../router';

export default {
  components: {
    IniciarSesion,
    Registrarse,
    BotonesInvitado,
    BotonesUsuario,
    MenuUsuario,
  },
  emits: ['login', 'logout'],
  data() {
    return {
      token: '',
    };
  },
  computed: {
    sesionIniciada() {
      return this.token != null;
    },
    usuario() {
      return this.token ? jwtDecode(this.token) : '';
    },
  },
  methods: {
    anhadirProductoCarrito(idUsuario, idProducto, cantidad) {
      return fetch(
        `${this.backend}/productocarrito/crear/${idUsuario}/${idProducto}`,
        {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            cantidad: cantidad,
          }),
        }
      )
        .then((response) => {
          if (!response.ok) {
            throw new Error(response.status);
          }
        })
        .catch((error) => {
          console.error(error);
        });
    },
    cargarProductosCarrito() {
      if (localStorage.getItem('carrito') && !this.usuario.admin) {
        let carrito = JSON.parse(localStorage.getItem('carrito')) ?? [];
        let promesas = [];

        for (const producto of carrito) {
          promesas.push(
            this.anhadirProductoCarrito(
              this.usuario.id,
              producto.producto.id,
              producto.cantidad
            )
          );
        }

        localStorage.removeItem('carrito');
      } else if (localStorage.getItem('carrito') && !this.usuario.admin) {
        this.productosCarrito = JSON.parse(localStorage.getItem('carrito'));
      }
    },

    logout() {
      this.$cookies.remove('token', '/', import.meta.env.HOST);
      this.token = null;

      setTimeout(() => {
        this.$emit('logout');
      }, 500);
      router.push('/');
      push.info({ message: 'Has cerrado sesión' });
    },
    login() {
      this.token = this.$cookies.get('token');
      this.cargarProductosCarrito();
      setTimeout(() => {
        this.$emit('login');
      }, 500);
      router.push('/');
    },
  },

  mounted() {
    this.token = this.$cookies.get('token');
  },
};
</script>

<template>
  <component
    :nombre="usuario.nombre ?? null"
    @logout="logout"
    :is="sesionIniciada ? 'BotonesUsuario' : 'BotonesInvitado'"
  ></component>

  <MenuUsuario
    class="d-lg-none"
    @logout="logout"
    :nombre="usuario.nombre ?? null"
  />
  <IniciarSesion @login="login" />
  <Registrarse />
</template>
<style scoped></style>
