import HomeView from '@/views/HomeView.vue';
import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/productos/categoria/:nomCategoria',
      name: 'categoria',
      component: () => import('../views/CategoriaView.vue'),
    },
    {
      path: '/productos/buscar/:busqueda/:nomCategoria?/',
      name: 'busqueda',
      component: () => import('../views/BusquedaView.vue'),
    },

    {
      path: '/producto/:nomCategoria/:nomProducto/:idProducto',
      name: 'producto',
      component: () => import('../views/ProductoView.vue'),
    },

    {
      path: '/perfil',
      name: 'perfil',
      component: () => import('../views/PerfilView.vue'),
    },

    {
      path: '/pedido/:idPedido',
      name: 'pedido',
      component: () => import('../views/PedidoView.vue'),
    },
    {
      path: '/carrito',
      name: 'carrito',
      component: () => import('../views/CarritoView.vue'),
    },

    {
      path: '/pasarela-pago',
      name: 'pasarela',
      component: () => import('../views/PasarelaView.vue'),
    },
    {
      path: '/panel-gestion',
      name: 'panelGestion',
      component: () => import('../views/PanelGestionView.vue'),
    },

    {
      path: '/panel-gestion/gestion-inventario',
      name: 'gestionInventario',
      component: () => import('../views/InventarioView.vue'),
    },

    {
      path: '/panel-gestion/gestion-usuarios',
      name: 'gestionUsuarios',
      component: () => import('../views/UsuariosView.vue'),
    },
    {
      path: '/panel-gestion/gestion-pedidos',
      name: 'gestionPedidos',
      component: () => import('../views/GestionPedidos.vue'),
    },
  ],
});

export default router;
