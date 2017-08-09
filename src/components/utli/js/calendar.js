/**
 * Created by Admin on 2017/7/28.
 */
import "@/assets/mylib/functions"

class Calendar {
  month_days = {
    1: 31,
    2: 28,
    3: 31,
    4: 30,
    5: 31,
    6: 30,
    7: 31,
    8: 31,
    9: 30,
    10: 31,
    11: 30,
    12: 31,
  }

  constructor(year) {
    this.gen_month_array(2016, 2)
  }

  gen_month_array(year, month) {
    let days = []
    let first_day = this._get_day(year, month, 1)
    for (const i of range(first_day)) {
      days.append("")
    }

    for (const i of range(this._get_month_day(year, month),1)) {
      days.append(i)
    }
    return days
  }

  _get_month_day(year, month) {
    // 知道這個月是不是閏年，以及該月有幾天
    let day = this.month_days[month]
    if (this._is_leap_year(year) && month === 2) {
      day = day + 1
    }
    return day
  }

  _get_day(year, month, day) {
    // 知道這個日期是禮拜幾 0~6
    return new Date(year, month - 1, day).getDay()
  }

  _is_leap_year(year) {
    // 判斷閏年
    return ((year % 4) === 0) && ((year % 100) !== 0) || ((year % 400) === 0)
  }

}


export default Calendar
