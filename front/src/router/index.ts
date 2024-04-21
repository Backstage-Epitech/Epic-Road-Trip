import HomeView from '@/views/HomeView.vue'
import PlanificationView from '@/views/PlanificationView.vue'
import MapItinerary from '@/views/MapItinerary.vue'
import MapResearch from '@/views/MapResearch.vue'
import ProfileView from '@/views/ProfileView.vue'
import { createRouter, createWebHistory } from 'vue-router'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/map',
      name: 'map',
      component: MapItinerary
    },
    {
      path: '/map-research',
      name: 'map-research',
      component: MapResearch
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
