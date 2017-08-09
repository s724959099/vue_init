import "@/assets/mylib/array"

window.and_ = (...condition) => {
  for (let i of condition) {
    if (!i) return false
  }
  return true
}
window.or_ = (...condition) => {
  for (let i of condition) {
    if (i) return true
  }
  return false
}

window.watcher = (obj, arg, fn) => {
  let _watch = obj[arg]
  setInterval(() => {
    if (_watch !== obj[arg]) {
      _watch = obj[arg]
      fn(_watch)
    }
  }, 100)
}


function uuid() {
  var d = Date.now();
  if (typeof performance !== 'undefined' && typeof performance.now === 'function') {
    d += performance.now(); //use high-precision timer if available
  }
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    var r = (d + Math.random() * 16) % 16 | 0;
    d = Math.floor(d / 16);
    return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
  });
}
window.uuid = uuid

window.Eventhelper = {
  data: [],
  trigger_data: [],
  remove(val){
    this.data = this.data.remove_obj_with_key("id", val)
  },
  listen(key, fn, call_triggered = true){
    if (typeof fn === "function") {
      let obj = {
        key: key,
        fn: fn,
        id: uuid(),
      }
      this.data.append(obj)
      if (call_triggered) {
        this._excute_in_trigger_data(obj)
      }
      return obj.id
    } else {
      console.log("need function")
    }
  },
  _excute_in_trigger_data(obj){
    let data = this.trigger_data.in_obj_with_key("key", obj.key)
    for (let item of data) {
      obj.fn(...item.arg)
    }
  },
  _in_trigger_data(key){
    let in_trigger = this.trigger_data.is_in_obj_with_key("key", key)
    return in_trigger

  },
  trigger(key, ...arg){
    let in_data = this._in_trigger_data(key)
    for (let item of this.data) {
      if (item.key === key) {
        item.fn(...arg)
      }
    }
    let trigger_obj = {
      key: key,
      arg: arg,
    }
    if (!in_data) {
      this.trigger_data.append(trigger_obj)
    } else {
      this.trigger_data.change_obj_with_key("key", key, trigger_obj)
    }
  }
}

