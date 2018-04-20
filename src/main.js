import Vue from 'vue'
import App from './App'
import router from './router'
import 'vuetify/dist/vuetify.min.css'
import '@/assets/css/flexgrid.css'
import mb_utli from 'js-meatball-utli'
import { storeMain } from './assets/js/store'
// import Vuetify from 'vuetify'

mb_utli.install_py(window)
mb_utli.install_utli(window)
mb_utli.install_vue(Vue)

import install from '@/components/utli/index'

install(Vue)
// Vue.use(Vuetify)
// Vue.use(Vuetify, {
//   theme: {
//     primary: '#35e2b1',
//   }
// })



/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App },
  ...storeMain
})
