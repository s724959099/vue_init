export default {
  props:{
    value: null,
  },
  data () {

    return {
      temp_val: this.value,
    }
  },
  watch:{
    temp_val(val){this.$emit('input',val)},
    value(val){this.temp_val = val},
  },
}
