<template>
  <div ref="snackbar" class="all-screen"
       :style="screen_style"
  >
    <transition :name="fade_name">
      <div class="snackbar-content" v-show="temp_show">
        <slot></slot>
      </div>
    </transition>
  </div>
</template>

<script>
  export default {
    components: {},
    props: {
      value: Boolean,
      position: Array,
      screen_style: Object,
      timeout: [String, Number],
    },
    data () {

      return {
        temp_show: this.value,
      }
    },
    computed:{
      fade_name(){
        if(this.position.in("top")){
          return "fade-top"
        }
        if(this.position.in("bottom")){
          return "fade-bottom"
        }
      }
    },
    watch: {
      temp_show(val){
        this.$emit("input", val)
      },
      value(val){
        this.temp_show = val
        let timeout = parseInt(this.timeout)
        if (val && timeout && timeout !== 0) {
          setTimeout(() => {
            this.temp_show = false
          }, timeout)
        }
      }
    },
    methods: {
      position_obj(){
        let obj = {
        }
        for (const direction of this.position) {
          obj[direction] = 20
        }
        return obj
      }
    },
    mounted(){
      $("#app[data-app]").prepend($(this.$refs.snackbar))
      $(".snackbar-content").css(this.position_obj())

    }
  }
</script>

<style lang="sass" scoped>
  @import "../../assets/sass/main"
  .all-screen
    position: fixed
    +size(100%)

  .snackbar-content
    position: absolute
    z-index: 20

  .fade-enter-active, .fade-leave-active
    transition: all .5s

  .fade-enter, .fade-leave-to
    opacity: 0

  .fade-top-enter-active, .fade-top-leave-active
    transition: all .5s
    transform: translateY(0)

  .fade-top-enter, .fade-top-leave-to
    opacity: 0
    transform: translateY(-100%)


  .fade-bottom-enter-active, .fade-bottom-leave-active
    transition: all .5s
    transform: translateY(0)

  .fade-bottom-enter, .fade-bottom-leave-to
    opacity: 0
    transform: translateY(100%)


</style>
