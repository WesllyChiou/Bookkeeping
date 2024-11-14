import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import Contact  from '../views/Contact.vue';
import Tutorials from '../views/Tutorials.vue';

const routes = [
  { path: '/', component: Home },
  { path: '/contact', component: Contact  },
  { path: '/tutorials', component: Tutorials },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
