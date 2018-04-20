let mb_utli = require("js-meatball-utli").default
mb_utli.install_py(global)
mb_utli.install_utli(global)

function get_uuid() {
  let d = new Date().getTime()
  let uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    let r = (d + Math.random() * 16) % 16 | 0
    d = Math.floor(d / 16)
    return (c == 'x' ? r : (r & 0x7 | 0x8)).toString(16)
  })
  return uuid
}


let fs = require('fs')
let path = require('path')
const INDEX_PATH = "src/pages"

let pathFormat = (str_path) => {
  let ret = []
  fs.readdirSync(str_path).forEach(file_name => {
    let file_path = path.join(str_path, file_name)
    let get_id = "m" + get_uuid().replace(/-/g, "")
    let obj = {
      name: file_name,
      type: 'file',
      path: file_path,
      parent: str_path.replace(INDEX_PATH, "").split("/").slice(-1)[0],
      id: get_id
    }
    if (fs.lstatSync(file_path).isDirectory()) {
      obj.type = 'dir'
      obj.children = pathFormat(file_path)
    }
    // 只增加 vue or dir
    if (file_name.split(".")[1] !== 'vue' && obj.type !== 'dir') {
      return false
    }
    ret.append(obj)
  })
  return ret
}

class GenFiles {
  constructor(str_path) {
    this.imports = []
    this.routes = pathFormat(str_path)
    this.output = this.parse_routes(this.routes)
  }

  is_main_children(item) {
    return item.name === '_children' || item.name === 'main.vue'
  }

  main_children(arr) {
    // if (len(arr) > 2) {
    //   throw Error("main_children error")
    // }
    let main, childItem

    for (let item of arr) {
      if (item.using)
        return null
      if (item.name === 'main.vue') {
        main = item
        item.using = true
      } else if (item.name === '_children') {
        childItem = item
        item.using = true
      }
    }
    let p = this._item_to_path(main)
    let obj = {
      path: p,
      name: p,
      component: main.id,
      children: []
    }
    let ret = []
    for (let item of this.parse_routes(childItem.children)) {
      if (Array.isArray(item)) {
        item = item[0]
      }
      ret.append(item)
    }
    let import_str =
      `import ${main.id} from '${main.path.replace(/src/, "@")}'`
    this.imports.push(import_str)
    obj.children.append(...ret)
    return obj

  }

  _item_to_path(item) {
    let p = item.path.replace(item.name, "").replace(INDEX_PATH, "")
    let g = p.split("/")
    let ret = ""
    for (let s of g) {
      if (s === "")
        continue
      if (s === "_children")
        ret += "/"
      else
        ret += "/" + s
    }
    ret = ret.replace("//", "/")
    if (ret === "")
      ret = "/"
    ret = ret.replace("_", ":")
    return ret
  }

  path_to_tmeplate(item) {
    let p = this._item_to_path(item)
    return {
      path: p,
      name: p,
      component: item.id,
      children: []
    }
  }

  parse_routes(arr) {
    let ret = []
    for (let item of arr) {
      let obj
      if (this.is_main_children(item)) {
        obj = this.main_children(arr)
        if (obj === null)
          continue
      } else if (item.type === 'dir') {
        obj = this.parse_routes(item.children)
        obj = obj[0]
      } else {
        obj = this.path_to_tmeplate(item)
        let import_str =
          `import ${item.id} from '${item.path.replace(/src/, "@")}'`
        this.imports.push(import_str)
      }
      ret.append(obj)
    }
    return ret
  }

  gen_js_file() {
    let result = ""
    for (let item of this.imports) {
      result += item + "\n"
    }
    result += "\n\n"
    let json_output = JSON.stringify(this.output, null, "\t")
    json_output = json_output.replace(/"component": "(\w+)",/g, '"component": $1,')
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


function main() {
  let gen_file = new GenFiles(INDEX_PATH)
  write_to_utli_js(gen_file.gen_js_file())
}


main()
