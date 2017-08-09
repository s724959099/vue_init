<template>
  <v-data-table
    ref="table"
    v-model="selected"
    :headers="headers"
    :items="items"
    select-all
    :pagination.sync="pagination"
    selected-key="_id"
    class="table"
    hide-actions
  >
    <!--:pagination.sync="pagination" remove this to append data-->
    <template slot="headers" scope="props">
      <tr>
        <th v-if="selectable">
          <v-checkbox
            primary
            hide-details
            @click.native="toggleAll"
            v-model="props.all"
            :indeterminate="props.indeterminate"
          ></v-checkbox>
        </th>
        <th v-for="header in props.headers" :key="header.text"
            class="text-xs-left"
            :class="['column sortable', pagination.descending ? 'desc' : 'asc', header.value === pagination.sortBy ? 'active' : '']"
            @click="changeSort(header)"
        >
          <v-icon v-if="header.sortable!==false">arrow_upward</v-icon>
          {{ header.text }}
        </th>
      </tr>
    </template>
    <template slot="items" scope="props">
      <tr :active="props.selected"
          :class="{'light-blue lighten-4':tr_color(props)}"
      >
        <td v-if="selectable">
          <v-checkbox
            primary
            hide-details
            v-model="props.selected"

          ></v-checkbox>
        </td>
        <slot name="items"
              :item="props.item"
        ></slot>
      </tr>
    </template>
  </v-data-table>
</template>

<script>
  import table_mixin from "@/assets/mylib/table_mixin"
  import table_method from "@/assets/mylib/table_mixin_method"
  export default {
    mixins: [table_mixin, table_method],
    components: {},
    props: {
      headers: Array
    },
    data () {

      return {}
    },
    computed: {},
    methods: {
      tr_color(props){
        if (props.selected) return false
        if (props.item._type === "create" &&
          props.item._edit === false) {
          return true
        } else {
          return false
        }
      },


    },
    mounted(){
    }
  }
</script>

<style lang="sass" scoped>
  @import "../../assets/sass/main"
  .table
    margin-top: 30px


</style>
