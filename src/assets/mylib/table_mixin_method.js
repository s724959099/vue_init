export default {
  methods: {
    remove_selected(){
      for (let item of this.selected) {
        item._type = "delete"
        item._edit = false
        this.delete_items.append(item)
      }

      this.items.remove(this.selected)
      this.selected = []

    },
    append(data){
      if (Array.isArray(data)) {
        for (let item of data) {
          item._type = "create"
          item._edit = false
          this.items.append(item)
        }
      } else {
        data._type = "create"
        data._edit = false
        this.items.append(data)
      }

    },
    copy_selected(){
      let result = []
      for (let obj of this.selected) {
        let new_obj = {}
        for (let key of Object.keys(obj)) {
          let item = obj[key]
          new_obj[key] = item
        }
        result.append(new_obj)
      }

      return result
    },
    cut_selected(){
      let data = this.copy_selected()
      this.selected = []
      return data
    },
    init_item(call_back){
      let index = 0
      for (let item of this.items) {
        call_back(item, index)
        index++
      }
    },
    init_id(){
      this.init_item((item, key) => {
        item._id = key
      })
    },
    type_edit(item){
      if (item._type === "read") {
        item._type = "update"
      }
      item._edit = true
    },
    init_table(){
      this.init_item((item, key) => {
        item._id = key
        item._type = "read"
        item._edit = false
      })
    },
    new_item(item){
      item._type = "create"
      item._edit = false
      item._id = this.items.length
    },
    toggleAll () {
      if (this.selected.length) this.selected = []
      else this.selected = this.items.slice()
    },
    changeSort (header) {
      if (header.sortable === false) {
        return false
      }
      if (this.pagination.sortBy === header.value) {
        this.pagination.descending = !this.pagination.descending
      } else {
        this.pagination.sortBy = header.value
        this.pagination.descending = false
      }
    },

  },
}
