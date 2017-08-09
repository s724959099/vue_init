<template>
  <v-dialog v-model="dialog"
            :width="width"
            ref="dialog"
  >
    <v-card ref="card">
      <slot
      ></slot>
    </v-card>
  </v-dialog>
</template>

<script>
  import modal from "./mixin/modal"
  export default {
    data(){
      return {
        width: 0
      }
    },
    mixins: [modal],
    methods: {
      change_width(){
        this.width=$(this.$refs.card).children().width()
      }
    },
    mounted(){
      this.change_width()
    }
  }
</script>

<style lang="sass" scoped>
  @import "../../assets/sass/main"
  .card
    border-radius: 5px

  .clear
    position: absolute
    right: 0px
    top: 0px

  .bottom
    .cancel
      margin-right: 20px
    .ok
      margin-right: 30px


</style>
