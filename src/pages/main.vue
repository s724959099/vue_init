<template>
  <div>
    {{demo.temp}}
    <router-view></router-view>
  </div>
</template>

<script>
  import demo from '@/store/demo'

  export default {
    data () {

      return {
        demo
      }
    },
    methods: {},
    mounted() {
      window.d = demo
      console.log("main mounted")
    }
  }
</script>

<style lang="sass" scoped>
</style>
