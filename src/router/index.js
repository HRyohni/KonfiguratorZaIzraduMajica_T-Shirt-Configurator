import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [

    {
      path: '/',
      name: '',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../components/TshirtConfigurator.vue'),
    },

    {
      path: '/hvala',
      name: 'Hvala',
      // Lazy loading za bolju performansu
      component: () => import('../views/ThankYou.vue'),
    },
  ],
})

export default router
