import { createRouter, createWebHistory } from 'vue-router'
import studentHomeView from '../views/student/HomeView.vue'

const routes = [
  {
    path: '',
    name: '',
    component: () => import('../views/common/LandingView.vue')
  },
  {
    path: '/',
    name: 'landingPage',
    component: () => import('../views/common/LandingView.vue')
  },
  {
    path: '/sHome',
    name: 'StudentHome',
    component: studentHomeView
  },
  {
    path: '/iHome',
    name: 'InstructorHome',
    component: () => import('../views/instructor/HomeView.vue')
  },
  {
    path: '/create',
    name: 'createCourse',
    component: () => import('../views/instructor/CreateCourse.vue')
  },
  {
    path: '/iMessage',
    name: 'InstructorMessages',
    component: () => import('../views/instructor/Messages.vue')
  },
  {
    path: '/auth/:id',
    name: 'authPage',
    component: () => import('../views/common/AuthView.vue')
  },
  {
    path: '/student/courseView',
    name: 'courseView',
    component: () => import('../views/student/CourseView.vue')
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
