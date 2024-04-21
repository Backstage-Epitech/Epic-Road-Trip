import HomeView from '@/views/HomeView.vue'
import PlanificationView from '@/views/PlanificationView.vue'
import ProfileView from '@/views/ProfileView.vue'
import { createRouter, createWebHistory } from 'vue-router'

export const PLANIFICATION_URL = '/planification'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
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
      path: PLANIFICATION_URL,
      name: 'planification',
      component: PlanificationView
    },
    {
      path: '/profile',
      name: 'profile',
      component: ProfileView,
      meta: { requiresAuth: true }
    },
  ]
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!isLoggedIn()) {
      next({
        path: '/login',
        query: { redirect: to.fullPath }
      })
    } else {
      next()
    }
  } else {
    next()
  }
})

function isLoggedIn() {
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  return !!user.id; 
}

export default router
