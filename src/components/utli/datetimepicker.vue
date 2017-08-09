<template>
  <v-menu
    lazy
    :close-on-content-click="false"
    v-model="show_menu"
    transition="scale-transition"
    offset-y
  >
    <input type="text" class="default_input"
           slot="activator"
           :placeholder="name"
           v-model="output"
           readonly
    >
    <v-time-picker v-if="type==='time'" v-model="output" autosave></v-time-picker>
    <v-date-picker v-if="type==='date'" v-model="output" no-title scrollable actions>

    </v-date-picker>
  </v-menu>
</template>

<script>
  export default {
    name: 'datetimepicker',
    props: {
      value: [String, Number],
      name:String,
      type:String,
    },
    data () {

      return {
        show_menu: false,
        output: this.value
      }
    },
    watch: {
      value(val){
        this.output = val
      },
      output(val){
        console.log("output change..")
        this.$emit("input", val)
      },
    },
    methods: {},
    mounted(){

    }
  }
</script>

<style lang="sass">

</style>
