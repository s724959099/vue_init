import Vue from 'vue'

let vueList = []
export const storeMain = {
  watch: {
    '$route' (val) {
      for (let vue of vueList) {
        let ret = vue.init()
        for ([key, val] of Object.entries(ret)) {
          vue.$data[key] = val
        }
      }
    }
  }
}

class Store {

}

export default new Proxy(Store, {
  construct (target, arg) {
    let config = {
      template: '<div></div>',
      data () {
        return this.init()
      },
      methods: {
        init () {
          return {}
        }
      }
    }
    for (let fn of ['methods', 'template', 'data']) {
      config[fn] = Object.assign(config[fn], arg[0][fn])
    }

    let vue = new Vue(config)
    if (arg[1] === undefined || arg[1] === true) {
      vueList.push(vue)
    }

    return vue
  }
})
