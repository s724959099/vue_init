<template>
  <v-date-picker
    :days="days"
    v-model="picker"
    firstDayOfWeek="日"
    :months="month"
  ></v-date-picker>
</template>

<script>
  class PickerChoose{
      constructor(vm){
          this.vm = vm
      }
  }
  export default {
    props: {
      value: String,
    },
    data () {
      let date = this.value || new Date().toISOString().split("T")[0]
      return {
        picker: null,
        days: ['日', '一', '二', '三', '四', '五', '六'],
        month: [
          '一月',
          '二月',
          '三月',
          '四月',
          '五月',
          '六月',
          '七月',
          '八月',
          '九月',
          '十月',
          '十一月',
          '十二月'
        ]
      }
    },
    watch: {
      picker(val){
        this.$emit("input", val)
        console.log("picker change")
      },
    },
    updated(){
      console.log("updated")
    },
    methods: {
    },
    mounted(){
      $(".picker--date__title-year").on("click",function(){
          console.log("year click")
          $("li.active").on("click",function(){
              console.log("li click")
          })
      })

    }
  }
</script>

<style lang="sass" scoped>
  @import "../../assets/sass/main"


</style>
