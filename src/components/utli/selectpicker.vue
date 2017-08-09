<template>
  <select class="selectpicker" :data-style="data_style" v-model="new_select_val"
          :data-menu-style="data_menu_style">
    <option :value='item.val' v-for="item in options">{{item.label}}</option>
  </select>
</template>

<script>
  //  options 的參數裡面必須要為物件 obj.val and obj.label
  import bootstrap_year from '@/assets/css/bootstrap-year-calendar.min.css'
  import bootstrap from '@/assets/css/bootstrap.min.css'
  import demo from '@/assets/css/demo.css'
  import paper_dashboard from '@/assets/css/paper-dashboard.css'
  import summernote from '@/assets/css/summernote.css'
  import icon from '@/assets/css/themify-icons.css'
  import bxb from '@/assets/css/bxb.css'

  // import js lib
  import jquery_ui from '@/assets/js/jquery-ui.min.js'
  import bootstrap_js from '@/assets/js/bootstrap.min.js'
  import validate from '@/assets/js/jquery.validate.min.js'
  import bootstrap_checkbox from '@/assets/js/bootstrap-checkbox-radio-switch-tags.js'
  import bootstrap_table from '@/assets/js/bootstrap-table.js'
  import jquery_tablednd from '@/assets/js/jquery.tablednd.min.js'
  import table_reorder from '@/assets/js/bootstrap-table-reorder-rows.min.js'
  import paper_dashboard_js from '@/assets/js/paper-dashboard.js'
  import bootstrap_year_js from '@/assets/js/bootstrap-year-calendar.min.js'
  import page_js from '@/assets/js/page.js'
  import selectpicker from '@/assets/js/bootstrap-selectpicker.js'
  import bootstrap_notify from '@/assets/js/bootstrap-notify.js'
  import fullcalendar from '@/assets/js/fullcalendar.min.js'
  import datetimepicker from '@/assets/js/bootstrap-datetimepicker.js'

  export default {
    name: 'selectpicker',
    props: {
      data_style: {
        default: "btn-danger btn-block",
        type: String,
      },
      data_menu_style: {
        default: "dropdown-blue",
        type: String,
      },
      options: Array,
      select_val: {
        default: "",
        type: [String, Number],
      }
    },
    data () {

      return {
        new_select_val: this.select_val
      }
    },
    computed: {},
    watch: {
      new_select_val(){
        this.$emit("update:select_val", this.new_select_val)
      }
    },
    updated(){
      $(this.$el).selectpicker("refresh")
    },
    methods: {},
    mounted(){
      $(this.$el).selectpicker("refresh")
    }
  }
</script>

<style lang="sass">

</style>
