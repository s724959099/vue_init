<template>
  <div id="app">
    <img src="./assets/logo.png">
    <router-view></router-view>
  </div>
</template>

<script>
  export default {
    name: 'app'
  }
</script>

<style lang="sass">
  @import "assets/sass/main"
  *
    font-family: 'Roboto', 微軟正黑體

  body, html
    +size(100%)

  #app
    +size(100%)

  button
    &:hover
      .btn__content
        &::before
          background-color: inherit !important


</style>
