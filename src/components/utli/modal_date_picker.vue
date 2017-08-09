<template>
  <only-modal
    :show.sync="temp_show"
  >
    <date-picker
      @click="temp_show=!temp_show"
      v-model="temp_picker"
    ></date-picker>
  </only-modal>
</template>

<script>

  export default {
    props: {
      show: Boolean,
      value: String,
    },
    data () {

      return {
        temp_picker: this.value,
        temp_show: this.show,
      }
    },
    watch: {
      temp_picker(val){
        this.$emit("input", val)
//        this.temp_show = false
      },
      show(val){
        this.temp_show = val
      },
      temp_show(val){
        this.$emit("update:show", val)
      }
    },
    methods: {},
    mounted(){
    }
  }
</script>

<style lang="sass" scoped>
  @import "../../assets/sass/main"
</style>
