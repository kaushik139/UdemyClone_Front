import { createRouter, createWebHistory } from 'vue-router'
import studentHomeView from '../views/student/HomeView.vue'

const routes = [
  {
    path: '',
    name: '',
    component: () => import('../views/common/LandingView.vue'),
    beforeEnter: async (to, from, next) => {
      try {
        const token = localStorage.getItem('token')
        const type = localStorage.getItem("role");
        if(!token) next()
        if(!type) next();
        if (token && type === "students") {
          next("/sHome");
        } else if (token && type === "instructors") {
          next('iHome');
        } else if (token && type === "admin") {
          next("/adminHome");
        } else {
          next('/');
        }
      } catch (error) {
        next("/");
      }
    },
  },
  {
    path: '/',
    name: 'landingPage',
    component: () => import('../views/common/LandingView.vue'),
    beforeEnter: async (to, from, next) => {
      try {
        const token = localStorage.getItem('token')
        const type = localStorage.getItem("role");
        if(!token) next()
        if(!type) next();
        if (token && type === "students") {
          next("/sHome");
        } else if (token && type === "instructors") {
          next('iHome');
        } else if (token && type === "admin") {
          next("/adminHome");
        } else {
          next('/');
        }
      } catch (error) {
        next("/");
      }
    },
  },
  {
    path: '/sHome',
    name: 'StudentHome',
    component: studentHomeView,
    beforeEnter: async (to, from, next) => {
      try {
        const token = localStorage.getItem('token')
        const type = localStorage.getItem("role");
        if(!token) next('/auth/l')
        if(!type) next('/auth/l');
        if (token && type === "students") {
          next();
        } else if (token && type === "instructors") {
          next('/iHome');
        } else if (token && type === "admin") {
          next("/adminHome");
        } else {
          next('/');
        }
      } catch (error) {
        next("/");
      }
    },
  },
  {
    path: '/iHome',
    name: 'InstructorHome',
    component: () => import('../views/instructor/HomeView.vue'),
    beforeEnter: async (to, from, next) => {
      try {
        const token = localStorage.getItem('token')
        const type = localStorage.getItem("role");
        if(!token) next('/auth/l')
        if(!type) next('/auth/l');
        if (token && type === "students") {
          next("/sHome");
        } else if (token && type === "instructors") {
          next();
        } else if (token && type === "admin") {
          next("/adminHome");
        } else {
          next('/');
        }
      } catch (error) {
        next("/");
      }
    },
  },
  {
    path: '/create',
    name: 'createCourse',
    component: () => import('../views/instructor/CreateCourse.vue'),
    beforeEnter: async (to, from, next) => {
      try {
        const token = localStorage.getItem('token')
        const type = localStorage.getItem("role");
        if(!token) next('/auth/l')
        if(!type) next('/auth/l');
        if (token && type === "students") {
          next("/sHome");
        } else if (token && type === "instructors") {
          next();
        } else if (token && type === "admin") {
          next("/adminHome");
        } else {
          next('/');
        }
      } catch (error) {
        next("/");
      }
    },
  },
  {
    path: '/iMessage',
    name: 'InstructorMessages',
    component: () => import('../views/instructor/Messages.vue')
  },
  {
    path: '/auth/:id',
    name: 'authPage',
    component: () => import('../views/common/AuthView.vue'),
    beforeEnter: async (to, from, next) => {
      try {
        const token = localStorage.getItem('token')
        const type = localStorage.getItem("role");
        if(!token) next()
        if(!type) next();
        if (token && type === "students") {
          next("/sHome");
        } else if (token && type === "instructors") {
          next("/iHome");
        } else if (!token && type === "admin") {
          next("/adminHome");
        } else {
          next('/');
        }
      } catch (error) {
        next("/");
      }
    },
  },
  {
    path: '/player',
    name: 'CoursePlay',
    component: () => import('../views/student/CoursePlayer.vue'),
    beforeEnter: async (to, from, next) => {
      try {
        const token = localStorage.getItem('token')
        const type = localStorage.getItem("role");
        if(!token) next('/')
        if(!type) next('/');
        if (token && type === "students") {
          next();
        } else if (token && type === "instructors") {
          next("/iHome");
        } else if (!token && type === "admin") {
          next();
        } else {
          next('/');
        }
      } catch (error) {
        next("/");
      }
    },
  },
  {
    path: "/:notFound",
    name: '4o4Page',
    component: () => import('../views/common/ErrorPage.vue')
  },
  {
    path: "/adminHome",
    name: 'adminHome',
    component: () => import('../views/admin/adminHome.vue'),
    beforeEnter: async (to, from, next) => {
      try {
        const token = localStorage.getItem('token')
        const type = localStorage.getItem("role");
        if(!token) next('/')
        if(!type) next('/');
        if (token && type === "students") {
          next("/sHome");
        } else if (token && type === "instructors") {
          next("/iHome");
        } else if (!token && type === "admin") {
          next("/adminHome");
        } else {
          next('/');
        }
      } catch (error) {
        next("/");
      }
    },
  },
]
  

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
