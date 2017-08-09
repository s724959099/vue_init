/**
 * Created by Admin on 2017/7/24.
 */
export default {
  props: {
    items: Array,
    selectable: Boolean,
    editable: Boolean,
    value: {
      default: () => [],
      type: Array
    },
  },
  data(){
    return {
      selected: this.value,
      delete_items:[],
      pagination: {
        sortBy: null,
        rowsPerPage: this.items.length
      },

    }
  },
  watch: {
    selected(val){
      this.$emit("input", val)
    },
    items(val){
      this.pagination.rowsPerPage = this.items.length
    },
    value(val){
      this.selected = val
    },
    "items.length"(){
      this.init_id()
    }
  },
  mounted(){
    this.init_table()
  }
}
