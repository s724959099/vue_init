import Vue from 'vue'
import Router from 'vue-router'
import index from "../pages/_children/index.vue"
import routes from "../pages/utli"
Vue.use(Router)

export default new Router({
  // mode: "history",
  routes: [
    {
      path: '/',
      name: 'index',
      component: index
    },
    ...routes
  ]
})
