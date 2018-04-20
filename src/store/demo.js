import Store from '@/assets/js/store'

export default new Store({
  data () {
    return {
      temp: 3
    }
  },
  mounted () {
    this.temp += 1
  }
})
