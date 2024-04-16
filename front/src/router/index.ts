import HomeView from '@/views/HomeView.vue'
import PlanificationView from '@/views/PlanificationView.vue'
import { createRouter, createWebHistory } from 'vue-router'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/map',
      name: 'map',
      component: import('../views/MapItinerary.vue')
    },
    {
      path: '/map-research',
      name: 'map-research',
      component: () => import('../views/MapResearch.vue')
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/LoginView.vue')
    },{
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/planification',
      name: 'planification',
      component: PlanificationView
    },
    {
      path: '/reservations',
      name: 'reservations',
      component: () => import('../views/LoginView.vue')
    },
    {
      path: '/profile',
      name: 'profile',
      component: () => import('../views/ProfileView.vue')
    },

  ]
})

export default router
