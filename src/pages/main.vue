<template>
  <div>
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
    }
  }
</script>

<style lang="sass" scoped>
</style>
