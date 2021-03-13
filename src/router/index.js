import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    // Document title tag
    // We combine it with defaultDocumentTitle set in `src/main.js` on router.afterEach hook
    meta: {
      title: 'Dashboard'
    },
    path: '/',
    name: 'home',
    component: Home
  },
  {
    meta: {
      title: 'Members'
    },
    path: '/members/:guid',
    name: 'tables',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "members" */ '../views/Members.vue')
  },
  {
    meta: {
      title: 'Treasury'
    },
    path: '/treasury/:guid',
    name: 'Treasury',
    component: () => import(/* webpackChunkName: "treasury" */ '../views/Treasury.vue')
  },
  {
    meta: {
      title: 'Stash'
    },
    path: '/stash/:guid',
    name: 'Stash',
    component: () => import(/* webpackChunkName: "stash" */ '../views/Stash.vue')
  },
  {
    meta: {
      title: 'Logs'
    },
    path: '/logs/:guid',
    name: 'Logs',
    component: () => import(/* webpackChunkName: "logs" */ '../views/Logs.vue')
  },
  {
    meta: {
      title: 'View Member'
    },
    path: '/member/:account',
    name: 'member.view',
    component: () => import(/* webpackChunkName: "client-form" */ '../views/ClientForm.vue'),
    props: true
  }
]

const router = new VueRouter({
  base: process.env.BASE_URL,
  routes,
  scrollBehavior (to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { x: 0, y: 0 }
    }
  }
})

export default router
