<template>
  <div class="form-group">
    <label class="col-md-3 control-label">音量</label>
    <div class="col-md-8">
      <div class="slider-danger slider-vol"></div>
    </div>
    <div class="col-md-1 vol-val">
      <div class="form-control-static">{{vol}}</div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'volume',
    props:["vol"],
    data () {

      return {
      }
    },

    methods: {

    },
    mounted(){
      const self = this
      $(this.$el).find('.slider-vol').slider({
        value: this.vol,
        orientation: 'horizontal',
        range: 'min',
        step: 5,
        animate: false,
        change:(event,ui)=>{
          self.$emit("update:vol",ui.value)
        }
      })
    }
  }
</script>

<style lang="sass">

</style>
