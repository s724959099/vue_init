export default {
  props: {
    show: {
      type: Boolean,
      default: false,
    },
    small: {
      type: Boolean,
      default: false,
    },
    large: {
      type: Boolean,
      default: false,
    },
    title: {
      type: String,
      default: "Modal",
    },
    modalTop: {
      type: Boolean,
      default: false,
    },
    okText: {
      type: String,
      default: "儲存",
    },
    cancelText: {
      type: String,
      default: "取消",
    },
    closeByShadow:{
      type:Boolean,
      default:true,
    }

  },
  data () {
    return {
      dialog: this.show,
      click_ok: false,
    }
  },
  methods: {
    dialog_width(){
      if (this.small) return 300
      if (this.large) return 900
      return 600
    },
    ok(){
      this.click_ok = true
      this.dialog = false
    },
    cancel(){
      this.click_ok = false
      this.dialog = false
    },
  },
  watch: {
    show(val){
      this.dialog = val
    },
    dialog(val){
      if (!val) {
        if (this.click_ok) {
          this.$emit("ok")
          this.click_ok = false
        } else {
          this.$emit("cancel")
        }
      }
      this.$emit("update:show", val)
    }
  },
  updated(){
    if (this.modalTop) {
      let $el = $(".dialog")
      $el.css({
        "align-self": "flex-start",
        "margin-top": "50px"
      })
    }
  },
}
