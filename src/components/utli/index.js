/**
 * Created by Admin on 2017/7/20.
 */
const Components = {}

function install(Vue) {
  Object.keys(Components).forEach(key => {
    Vue.component(`${key}`, Components[key])
  })

}

export default install
