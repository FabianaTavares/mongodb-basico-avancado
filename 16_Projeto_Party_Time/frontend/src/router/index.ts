import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import store from './../store/index.js'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: {
        requiresAuth: false
      }
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue'),
      meta: {
        requiresAuth: false
      }
    },
    {
      path: '/register',
      name: 'Register',
      component: () => import(/* webpackChuckName: "register" */ '../views/RegisterView.vue'),
      meta: {
        requiresAuth: false
      }
    },
    {
      path: '/login',
      name: 'Login',
      component: () => import(/* webpackChuckName: "login" */ '../views/LoginView.vue'),
      meta: {
        requiresAuth: false
      }
    },
    {
      path: '/profile',
      name: 'Profile',
      component: () => import(/* webpackChuckName: "profile" */ '../views/ProfileView.vue'),
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/dashboard',
      name: 'Dashboard',
      component: () => import(/* webpackChuckName: "dashboard" */ '../views/DashboardView.vue'),
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/newparty',
      name: 'NewParty',
      component: () => import(/* webpackChuckName: "NewParty" */ '../views/NewPartyView.vue'),
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/editparty/:id',
      name: 'EditParty',
      component: () => import(/* webpackChuckName: "EditParty" */ '../views/EditPartyView.vue'),
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/party/:id',
      name: 'Party',
      component: () => import(/* webpackChuckName: "party" */ '../views/PartyView.vue')
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (store.getters.authenticated === false) {
      next({
        path: '/login',
        params: { nextUrl: to.fullPath }
      })
    } else {
      next()
    }
  } else {
    next()
  }
})

export default router
