import Vue from 'vue'
import App from './App'
import router from './router'
import Vuetify from 'vuetify'
import "vuetify/dist/vuetify.min.css"

import install from "@/components/utli/index"

install(Vue)
Vue.use(Vuetify)


Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: {App}
})
