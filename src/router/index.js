import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const routes = [
  {
    path: '/home',
    name: 'home',
    component: HomeView
  },
  {
    path: '/',
    name: 'landingPage',
    component: () => import('../views/LandingView.vue')
  },
  {
    path: '/login',
    name: 'landingPage',
    component: () => import('../views/AuthView.vue')
  },
  {
    path: '/auth/:id',
    name: 'landingPage',
    component: () => import('../views/AuthView.vue')
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
