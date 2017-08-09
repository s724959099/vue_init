/**
 * Created by Admin on 2017/7/7.
 */
class PanelCursor {
  constructor(append_to_el, snap, id = "temp_id") {
    this.$el = $(append_to_el)
    this.width = 80
    this.height = 40
    this.id = id
    this.show = false
    this.snap = snap
    watcher(this, "show", (val) => {
      if (val) {
      } else {
        this.remove()
      }
    })
  }

  init() {
    if (this.$el.find(`#${this.id}`).length === 0 && this.show) {
      $(`<div id='${this.id}'></div>`).appendTo(this.$el).css({
        "position": "absolute",
        "border": "solid 1px #0096FD",
        "border-radius": "10px",
        "width": `${this.width}`,
        "height": `${this.height}`,
        "text-align": "center",
        "z-index": "10",
      })
    }
  }

  remove() {
    this.$el.find(`#${this.id}`).remove()
  }

  snapping(value) {
    let temp = value % this.snap
    if (temp < this.snap / 2) {
      return value - temp
    } else {
      return value + (this.snap - temp)
    }
  }

  move(x, y) {
    x = this.snapping(x)
    y = this.snapping(y)
    this.$el.find(`#${this.id}`).css({
      "left": x-this.width/2,
      "top": y-this.height/2,
      // "transform": `translate(-50%,-50%)`
    })
  }
}

export default PanelCursor
