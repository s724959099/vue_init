let mb_utli = require("js-meatball-utli").default
mb_utli.install_py(global)
mb_utli.install_utli(global)

let fs = require('fs')
let path = require('path')
const INDEX_PATH = "./src/components/"

class GenFiles {
  constructor(str_path) {
    this.imports = []
    this.routes = this.dir_parse(str_path)
    this.routes_parse()
  }

  routes_parse() {
    this._data_parse(this.routes)
  }

  gen_js_file() {
    let result = ""
    for (let item of this.imports) {
      result += item + "\n"
    }
    result += this.output
    result += `
function install(Vue) {
  Object.keys(Components).forEach(key => {
    Vue.component(\`\${key}\`, Components[key])
  })

}

export default install
    `
    return result
  }

  _data_parse(data) {

    let output = ""
    for (let item of data) {
      let import_str =
        `import ${item.file_name.split(".")[0]} from '${item.file_path.replace(/src/, "@")}'`
      this.imports.append(import_str)
      output += `\t${item.file_name.split(".")[0]},\n`
    }
    let template = `
const Components = {
${output}}    
`
    this.output = template
  }


  is_vue(file_name) {
    return file_name.split(".")[1] === 'vue'
  }


  dir_parse(str_path) {
    let pages = []
    let combines = []
    fs.readdirSync(str_path).forEach(file_name => {
      let file_path = path.join(str_path, file_name)

      if (fs.lstatSync(file_path).isDirectory()) {
        pages.append(...this.dir_parse(file_path))
      }


      if (this.is_vue(file_name)) {
        let obj = {
          file_name: file_name,
          file_path: file_path,
        }
        pages.push(obj)
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


}

let write_to_utli_js = (str) => {
  fs.writeFile(`${INDEX_PATH}/index.js`, str, function (err) {
    if (err)
      console.log(err)
    else
      console.log('Write operation complete.')
  })

}

let gen_file = new GenFiles(INDEX_PATH)
write_to_utli_js(gen_file.gen_js_file())

