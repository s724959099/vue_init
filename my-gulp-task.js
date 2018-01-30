function get_uuid() {
  let d = new Date().getTime()
  let uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    let r = (d + Math.random() * 16) % 16 | 0
    d = Math.floor(d / 16)
    return (c == 'x' ? r : (r & 0x7 | 0x8)).toString(16)
  })
  return uuid
}

Array.prototype.remove = function (val) {
  if (Array.isArray(val)) {
    for (let item of val) {
      this.remove(item)
    }
    return this
  }
  let index = this.indexOf(val)
  if (index !== -1)
    this.splice(index, 1)
  return this

}
Array.prototype.remove_obj_with_key = function (key, val) {
  let result = this.filter((obj) => {
    return obj[key] === val
  })
  return this.remove(result)
}
Array.prototype.get_obj = function (key, val, single = false) {
  let f = this.filter((item) => item[key] === val)
  if (single && f.length > 1) {
    throw "more than one"
  }
  return f.length ? f[0] : null
}

let fs = require('fs')
let path = require('path')
const INDEX_PATH = "./src/pages"

class GenFiles {
  constructor(str_path) {
    this.imports = []
    this.routes = this.dir_parse(str_path)
    this.output = []
    this.routes_parse()
  }

  routes_parse() {
    this.output = this._data_parse(this.routes)
    console.log()
  }

  get_web_path(file_path, file_name, is_combine_child) {
    file_path = file_path.replace(file_name, "")
    let result = file_path.replace(/src\/pages\//, "/")
    result = file_name === 'index.vue' ?
      result.substr(0, result.length - 1) : result
    result = result === "" ? "/" : result
    result = file_name.startsWith("_") ?
      path.join(
        result, file_name.split(".")[0].replace("_", ":")) : result

    result = is_combine_child ?
      result.replace(/\w*\/_children/, "") : result
    return result
  }

  _data_parse(dir, is_combine_child = false) {
    let routes = []
    let combine_main
    for (let item of dir) {
      if (is_combine_child && item.file_name === 'main.vue')
        combine_main = item
      if (item.file_type === 'dir') {
        let temp = this._data_parse(item.children, is_combine_child)
        is_combine_child ? routes = temp : routes.push(...temp)
      }
      if (item.file_type === 'file') {
        let import_str =
          `import ${item.id} from '${item.file_path.replace(/src/, "@")}'`
        this.imports.push(import_str)
        let obj = {
          path: this.get_web_path(item.file_path, item.file_name, is_combine_child),
          name: this.get_web_path(item.file_path, item.file_name, is_combine_child),
          component: item.id,
          children: [],
        }
        routes.push(obj)
      }
      if (item.file_type === 'children') {
        let temp = this._data_parse(item.children, true)
        routes.push(temp)
      }

    }
    if (is_combine_child && combine_main) {
      let main = routes.get_obj('component', combine_main.id)
      routes.remove_obj_with_key('component', combine_main.id)
      main.children = routes
      return main
    }
    return routes
  }

  is_vue(file_name) {
    return file_name.split(".")[1] === 'vue'
  }



  init_id() {
    return "m" + get_uuid().replace(/-/g, "")
  }

  dir_parse(str_path) {
    let pages = []
    let combines = []
    fs.readdirSync(str_path).forEach(file_name => {
      let file_path = path.join(str_path, file_name)
      let children = []

      if (fs.lstatSync(file_path).isDirectory()) {
        children.push(...this.dir_parse(file_path))
      }


      if (this.is_vue(file_name) || fs.lstatSync(file_path).isDirectory()) {
        let obj = {
          file_type: fs.lstatSync(file_path).isDirectory() ? 'dir' : 'file',
          file_name: file_name,
          file_path: file_path,
          id: this.init_id(),
          children: children
        }
        if (['_children', 'main.vue'].includes(file_name)) {
          combines.push(obj)
        } else {
          pages.push(obj)
        }
      }

    })
    if (combines.length === 2) {

      pages.push({
        file_type: 'children',
        children: combines
      })
    }
    return pages
  }

  gen_js_file() {
    let result = ""
    for (let item of this.imports) {
      result += item + "\n"
    }
    result += "\n\n"
    let json_output = JSON.stringify(gen_file.output, null, "\t")
    json_output = json_output.replace(/"component": "(\w+)",/g,'"component": $1,')
    result += "export default " + json_output
    return result
  }

}

let write_to_utli_js = (str) => {
  fs.writeFile('./src/pages/utli.js', str, function (err) {
    if (err)
      console.log(err)
    else
      console.log('Write operation complete.')
  })

}

let gen_file = new GenFiles(INDEX_PATH)
write_to_utli_js(gen_file.gen_js_file())
console.log(gen_file.gen_js_file())

