/* Styles */
import '@/scss/main.scss'

/* Core */
import Vue from 'vue'
import Buefy from 'buefy'

/* Router & Store */
import router from './router'
import store from './store'

/* Service Worker */
import './registerServiceWorker'

import VueEasyJwt from 'vue-easy-jwt'

/* Vue. Main component */
import App from './App.vue'

/* Default title tag */
const defaultDocumentTitle = '[TINY] Admin'

/* Collapse mobile aside menu on route change & set document title from route meta */
router.afterEach(to => {
  store.commit('asideMobileStateToggle', false)

  if (to.meta && to.meta.title) {
    document.title = `${to.meta.title} — ${defaultDocumentTitle}`
  } else {
    document.title = defaultDocumentTitle
  }
})

Vue.config.productionTip = false

Vue.use(Buefy)
Vue.use(VueEasyJwt)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
