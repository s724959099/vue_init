<template>
  <div></div>
</template>

<script>
  const BgColor = function (context) {
    let ui = $.summernote.ui

    return ui.buttonGroup([

      ui.button({
        className: 'dropdown-toggle',
        contents: '<span class=""/> 背景顏色<span class="note-icon-caret"></span></span>',
        tooltip: '背景顏色',
        data: {
          toggle: 'dropdown'
        }
      }),
      ui.dropdown({
        items: [
          '<li>',
          '<div class="btn-group">',
          '  <div class="note-palette-title"></div>',
          '  <div>',
          '    <button type="button" class="note-color-reset btn btn-default" data-event="bgColor" data-value="inherit">',
          '透明',
          '    </button>',
          '  </div>',
          '  <div class="note-holder" data-event="bgColor"/>',
          '</div>',
          '</li>'
        ].join(''),
        callback: function ($dropdown) {
          $dropdown.find('.note-holder').each(function () {
            let $holder = $(this)
            $holder.append(ui.palette({
              colors: [
                ['#000000', '#424242', '#636363', '#9C9C94', '#CEC6CE', '#EFEFEF', '#F7F7F7', '#FFFFFF'],
                ['#FF0000', '#FF9C00', '#FFFF00', '#00FF00', '#00FFFF', '#0000FF', '#9C00FF', '#FF00FF'],
                ['#F7C6CE', '#FFE7CE', '#FFEFC6', '#D6EFD6', '#CEDEE7', '#CEE7F7', '#D6D6E7', '#E7D6DE'],
                ['#E79C9C', '#FFC69C', '#FFE79C', '#B5D6A5', '#A5C6CE', '#9CC6EF', '#B5A5D6', '#D6A5BD'],
                ['#E76363', '#F7AD6B', '#FFD663', '#94BD7B', '#73A5AD', '#6BADDE', '#8C7BC6', '#C67BA5'],
                ['#CE0000', '#E79439', '#EFC631', '#6BA54A', '#4A7B8C', '#3984C6', '#634AA5', '#A54A7B'],
                ['#9C0000', '#B56308', '#BD9400', '#397B21', '#104A5A', '#085294', '#311873', '#731842'],
                ['#630000', '#7B3900', '#846300', '#295218', '#083139', '#003163', '#21104A', '#4A1031']
              ],
              eventName: $holder.data('event')
            }).render())
          })
        },
        click: function (event) {
          let $button = $(event.target)
          let eventName = $button.data('event')
          let value = $button.data('value')

          if (eventName && value) {
            // $editor.next().find('.note-editable.panel-body > .anno-bg').css('background-color', value);
            $editor.next().find('.note-editable.panel-body').css('background-color', value)
            $editor.next().find('.note-editable.panel-body').css('background-image', '')
          }
        }
      })
    ]).render()
  }

  export default {
    name: 'summernote',
    data () {

      return {}
    },
    methods: {
      summernote(...option){
        return $(this.$el).summernote(...option)

      },
      set_text(val){
        this.summernote("code", val)
      },
      get_text(val){
        return this.summernote("code").trim()
      }
    },
    mounted(){
      this.summernote({
        lang: 'zh-TW',
        height: 360,
        minHeight: 360,
        maxHeight: 360,
        width: 662,
        fontSizes: ['16', '24', '36', '48', '72'],
        toolbar: [
          ['style', ['bold', 'italic', 'underline']],
          ['fontsize', ['fontsize']],
          ['color', ['color']],
          ['para', ['paragraph']],
          ['bgcolor', ['bgcolor']],
          ['height', ['height']]

        ],
        buttons: {
          bgcolor: BgColor
        },
        callbacks: {}
      })
    }
  }
</script>

<style lang="sass">

</style>
