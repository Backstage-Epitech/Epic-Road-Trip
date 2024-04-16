import HomeView from '@/views/HomeView.vue'
import PlanificationView from '@/views/PlanificationView.vue'
import LoginOrRegister from '@/views/LoginOrRegister.vue'

import { createRouter, createWebHistory } from 'vue-router'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/register',
      name: 'register',
      component: LoginOrRegister
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
