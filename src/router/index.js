import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store'
import Home from '../views/Home.vue'
import Login from '../components/Login.vue'
import axios from 'axios'
import {
  VueEasyJwt
} from "vue-easy-jwt";
const jwt = new VueEasyJwt();

Vue.use(VueRouter)

const routes = [{
    // Document title tag
    // We combine it with defaultDocumentTitle set in `src/main.js` on router.afterEach hook
    meta: {
      title: 'Dashboard',
      requiresAuth: true
    },
    path: '/',
    name: 'home',
    component: Home
  },
  {
    meta: {
      title: 'Ban List',
      requiresAuth: true
    },
    path: '/ban',
    name: 'ban',
    component: () => import( /* webpackChunkName: "members" */ '../views/BanList.vue')
  },
  {
    meta: {
      title: 'Members',
      requiresAuth: true
    },
    path: '/members/:guid',
    name: 'tables',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import( /* webpackChunkName: "members" */ '../views/Members.vue')
  },
  {
    meta: {
      title: 'Treasury',
      requiresAuth: true
    },
    path: '/treasury/:guid',
    name: 'Treasury',
    component: () => import( /* webpackChunkName: "treasury" */ '../views/Treasury.vue')
  },
  {
    meta: {
      title: 'Stash',
      requiresAuth: true
    },
    path: '/stash/:guid',
    name: 'Stash',
    component: () => import( /* webpackChunkName: "stash" */ '../views/Stash.vue')
  },
  {
    meta: {
      title: 'Logs',
      requiresAuth: true
    },
    path: '/logs/:guid',
    name: 'Logs',
    component: () => import( /* webpackChunkName: "logs" */ '../views/Logs.vue')
  },
  {
    meta: {
      title: 'View Member',
      requiresAuth: true
    },
    path: '/member/:account',
    name: 'member.view',
    component: () => import( /* webpackChunkName: "client-form" */ '../views/MemberProfile.vue'),
    props: true
  },
  {
    path: '/login',
    name: 'login',
    component: () => import( /* webpackChunkName: "login" */ '../views/Login.vue')
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return {
        x: 0,
        y: 0
      }
    }
  }
})

// router.beforeEach((to, from, next) => {
//   to.matched.some((route) => {
//     if (route.meta.requiresAuth) {
//       const token = localStorage.getItem('token');

//       if (jwt.isExpired(token)) {
//         //try and refresh token
//         axios.post('https://api.tinyarmy.org/v1/auth/refresh_token')
//           .then((data) => {
//             localStorage.setItem('token', data.data.token);
//             axios.defaults.headers.common['Authorization'] = data.data.token
//             next();
//           })
//           .catch(() => {
//             localStorage.removeItem('token')
//             next('/login');
//           })
//       } else {
//         next();
//       }
//     } else {
//       next();
//     }
//   });
// });
router.beforeEach((to, from, next) => {
  if(to.matched.some(record => record.meta.requiresAuth)) {
    if (store.getters.isLoggedIn) {
      next()
      return
    }
    next('/login') 
  } else {
    next() 
  }
})

export default router
