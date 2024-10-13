import './assets/main.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
import { fab } from '@fortawesome/free-brands-svg-icons';
import '@fontsource/lato';
import '../node_modules/hamburgers/dist/hamburgers.css';
import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import VueCookies from 'vue-cookies';
import Navbar from './components/navegacion/Navbar.vue';
import SideBar from './components/navegacion/SideBar.vue';
import FooterVue from './components/navegacion/FooterVue.vue';
import PrimeVue from 'primevue/config';
import rate from 'vue-rate';

import 'notivue/notification.css';
import 'notivue/animations.css';
import 'notivue/notification.css';
import 'notivue/animations.css';
import 'notivue/notification-progress.css';
import 'primevue/resources/themes/aura-light-green/theme.css';
import 'primeicons/primeicons.css';
import 'vue-rate/dist/vue-rate.css';

import { createNotivue } from 'notivue';

const notivue = createNotivue({
  limit: 3,
  avoidDuplicates: true,
  position: 'bottom-right',
});

library.add(fas, far, fab);

const app = createApp(App);
app.config.globalProperties.backend = import.meta.env.VITE_BACKEND;

app.component('Navbar', Navbar);
app.component('FooterVue', FooterVue);
app.component('font-awesome-icon', FontAwesomeIcon);
app.component('SideBar', SideBar);

app.use(notivue);
app.use(PrimeVue);
app.use(rate);
app.use(VueCookies);
app.use(router);

app.mount('#app');
