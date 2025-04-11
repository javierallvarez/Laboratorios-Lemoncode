import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../components/HomeView.vue';


// Solo tenemos una ruta, podemos añadir más en el futuro
const routes = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
  ],
});


export default routes;
      
