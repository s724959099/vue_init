<template>
  <div class="calendar">
    <div class="row around-xs">
      <table class="calendar-month-table col-xs" v-for="i in 3">
        <thead>
        <tr>
          <th colspan="7">一月</th>
        </tr>
        <tr>
          <th v-for="item in weeks">{{item}}</th>
        </tr>
        </thead>
        <tbody>
        <tr>
          <td></td>
          <td class="day">2</td>
          <td class="day">3</td>
          <td class="day">4</td>
          <td class="day">5</td>
          <td class="day active">6</td>
          <td class="day">7</td>
        </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
  import Calendar from "./js/calendar"
  let calendar = new Calendar(2017)
  export default {
    data () {

      return {
        weeks: ["日", "一", "二", "三", "四", "五", "六"]
      }
    },
    methods: {},
    mounted(){
    }
  }
</script>

<style lang="sass" scoped>
  @import "../../assets/sass/main"
  *
    font-size: 16px
    font-family: 'Muli', Arial, sans-serif

  .calendar-month-table
    +size(180px, auto)
    tbody
      .day
        text-align: center
        cursor: pointer
        font-size: 13px
        z-index: 1
        &::after
          z-index: -1
          content: ""
          position: absolute
          left: 0px
          top: 0px
          +size(24px)
          +center
        &:hover
          color: white
          &::after
            opacity: .6
            border-radius: 50%
            background-color: #1976d2

        &.active
          color: white
          &::after
            border-radius: 50%
            opacity: 1
            background-color: #1976d2

</style>
