import Vue from 'vue'
import checkType from './checkType'

const deepAssign = (target, ...sources) => {
  sources.forEach(
    (source) => {
      Object.keys(source).map(
        (key) => {
          target[key] = checkType.Object(target[key]) && checkType.Object(source[key]) ? deepAssign(target[key], source[key]) : source[key]
        }
      )
    }
  )

  return target
}

const initData = (val, old_val) => {
  if (!(checkType.Object(val) && checkType.Object(old_val))) {
    return old_val
  } else {
    return deepAssign(val, old_val)
  }
}
let vueList = []
export const storeMain = {
  watch: {
    '$route' (val) {
      for (let vue of vueList) {
        for ([key, val] of Object.entries(vue.$bk_data)) {
          vue.$data[key] = initData({}, val)
        }
        vue.$mount()
      }
    }
  }
}

class Store {

}

export default new Proxy(Store, {
  construct (target, arg) {
    let mixin = {
      created () {
        this.$bk_data = deepAssign({}, this.$data)
      }
    }
    let config = {
      mixins: [mixin],
      template: '<div></div>',
      data () {
        return {}
      }
    }

    config = deepAssign(config, arg[0])

    let vue = new Vue(config)
    if (arg[1] === undefined || arg[1] === true) {
      vueList.push(vue)
    }
    vue.$mount()

    return vue
  }
})
