import Vue from 'vue'

let vueList = []
export const storeMain = {
  watch: {
    '$route' (val) {
      for (let vue of vueList) {
        vue.init()
      }
    }
  },
}

export default class Store {
  constructor (vueConfig, initable = true) {
    let vue = new Vue(Object.assign({
      template: '<div></div>',
    }, vueConfig))
    if(initable)
      vueList.push(vue)

  }
}
