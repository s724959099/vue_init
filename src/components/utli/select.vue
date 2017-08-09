<template>
  <v-select
    ref="select"
    :items="items"
    v-model="value"
    single-line
    :label="text"
  ></v-select>
</template>

<script>

  export default {
    props: ["items", "value", "name"],
    data () {

      return {}
    },
    computed: {
      text(){
        if (this.value && this.value.text) {
          let data = this.items.in_obj_with_key("_id", this.value._id)
          if (data.length > 1) return ""
          return data[0].text
        } else {
          return ""
        }
      }
    },
    watch: {
      value(val){
        this.$emit("input", val)
      }
    },
    methods: {},
    mounted(){
      let $select = $(this.$refs.select.$el)
      let height = $select.find(".input-group__details").height()
      $select.css({
        transform: `translateY(${height / 2}px)`
      })
    }
  }
</script>

<style lang="sass" scoped>
  @import "../../assets/sass/main"
</style>
