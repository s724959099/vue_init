let fns = ['Array', 'Arguments', 'Function', 'String', 'Number', 'Date', 'RegExp','Object','Boolean']
let checkType = {}
fns.map((fn) => {
  checkType[fn] = function (obj) {
    return toString.call(obj) === `[object ${fn}]`
  }
})
export default checkType