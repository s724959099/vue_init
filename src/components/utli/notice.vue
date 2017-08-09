<template>
  <m-full-screen v-model="snackbar"
                 v-bind="$attrs"
  >
    <v-card dark class="notice-card">
      <v-card-title class="pl-0 pr-0">
        <div class="row between-xs fill-width">
        <div class="text pl-4" self="center"><slot></slot></div>
        <v-btn flat class="ma-0 pink--text" @click.native="snackbar = false">Close</v-btn>
        </div>
      </v-card-title>
    </v-card>
  </m-full-screen>
</template>

<script>

  export default {
    props: {
      value: Boolean,
    },
    data () {

      return {
        snackbar: this.value,
      }
    },
    watch: {
      snackbar(val){
        this.$emit("input", val)
      },
      value(val){
        this.snackbar = val
      }
    },
    methods: {},
    mounted(){
    }
  }
</script>

<style lang="sass" scoped>
  @import "../../assets/sass/main"
  .notice-card
    +size(300px, 100px)
  .row
  .text
    font-size: 14px
    font-weight: 500
    line-height: 14px
</style>
