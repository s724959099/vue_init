<template>
  <div>
    <button @click="add">+1</button>
    <button @click="$router.push('/test')">totest</button>
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
    methods: {
      add () {
        this.demo.temp += 1
      }
    },
    mounted () {
    }
  }
</script>

<style lang="sass" scoped>
</style>
