let MyPlugin = {}
MyPlugin.install = function (Vue, options) {
  let node = []
  Vue.directive('validate', {
    bind: function (el, binding, vnode) {
      node.append({
        el,
        binding, vnode
      })

    }
  })


  Vue.prototype.$validate_all = function (ref) {
    let result= true
    for (let obj of node) {
      let $el = $(ref).find(obj.el)
      if ($el.length) {
        let val= $el.val()
        if (or_(val===null,val==="")) {
          result =false
          $el.addClass("error")
        }
      }
    }
    if(!result)
      notify("danger", "有欄位未填")

    return result
  }

}


export default MyPlugin
