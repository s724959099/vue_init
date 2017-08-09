<template>
  <v-dialog v-model="dialog"
            :width="dialog_width()"
            ref="dialog"
            :persistent="!closeByShadow"
  >
    <v-card>
      <slot name="header">
        <v-card-title class="headline">
          {{title}}
          <v-btn class="clear" icon @click.native="cancel">
            <v-icon>clear</v-icon>
          </v-btn>
        </v-card-title>
      </slot>
      <v-divider></v-divider>
      <!--<v-divider></v-divider>-->
      <v-card-text>
        <slot></slot>
      </v-card-text>
      <v-divider></v-divider>
      <slot name="footer">
        <v-card-actions class="row reverse bottom">
          <v-btn class="blue white--text ok" @click.native="ok">{{okText}}</v-btn>
          <v-btn class="cancel" @click.native="cancel">{{cancelText}}</v-btn>
        </v-card-actions>
      </slot>
    </v-card>
  </v-dialog>
</template>

<script>
  import modal from "./mixin/modal"
  export default {
    mixins:[modal],
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

