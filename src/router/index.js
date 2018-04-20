import Vue from 'vue'
import Router from 'vue-router'
import routes from "../pages/utli"
Vue.use(Router)

export default new Router({
  // mode: "history",
  routes: [
    ...routes
  ]
})
