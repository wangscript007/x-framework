<template>
  <div :class="{fullscreen:fullscreen}"
       class="editor-wrapper">
    <textarea :id="tinymceId"
              class="editor-textarea"></textarea>
    <div class="editor-custom-wrapper">
      <image-uploader @uploaderSuccess="uploaderSuccess"></image-uploader>
    </div>
  </div>
</template>

<script>
import * as options from '@/components/Tinymce/options'
import ImageUploader from '@/components/Tinymce/components/ImageUploader'

export default {
  name: 'Tinymce',
  props: {
    id: {
      type: String,
      default: function () {
        return 'vue-tinymce-' + +new Date() + ((Math.random() * 1000).toFixed(0) + '')
      }
    },
    value: {
      type: String,
      default: ''
    },
    disabled: {
      type: Boolean,
      default: false
    },
    toolbar: {
      type: Array,
      required: false,
      default () {
        return []
      }
    },
    menubar: {
      type: String,
      default: options.menuBar
    },
    height: {
      type: Number,
      required: false,
      default: 360
    }
  },
  data () {
    return {
      hasChange: false,
      hasInit: false,
      tinymceId: this.id,
      fullscreen: false
    }
  },
  watch: {
    value (val) {
      if (!this.hasChange && this.hasInit) {
        this.$nextTick(() =>
          window.tinymce.get(this.tinymceId).setContent(val || ''))
      }
    }
  },
  mounted () {
    this.initTinymce()
  },
  activated () {
    this.initTinymce()
  },
  deactivated () {
    this.destroyTinymce()
  },
  destroyed () {
    this.destroyTinymce()
  },
  methods: {
    initTinymce () {
      const _this = this
      window.tinymce.init({
        selector: `#${this.tinymceId}`,
        language: 'zh_CN', /* 语言 */
        height: this.height, /* 编辑器高度 */
        plugins: options.plugins, /* 插件列表 */
        menubar: this.menubar, /* 菜单设置 */
        toolbar: this.toolbar.length > 0 ? this.toolbar : options.toolbar, /* 工具栏设置 */
        font_formats: options.fontFormats, /* 字体选择设置 */
        fontsize_formats: options.fontSizeFormats, /* 字体大小选择设置 */
        body_class: 'panel-body', /* 内容编辑区为iframe嵌套一个子页面，该选项可以为子页面的body设置css类 */
        object_resizing: true, /* 是否允许图像、媒体在编辑器中拖拽调整大小 */
        end_container_on_empty_block: true, /* 如果在空的内部块元素中按Enter键，则此选项允许您拆分当前的容器块元素 */
        powerpaste_word_import: 'prompt', /* 控制如何筛选从Microsoft Word粘贴的内容。 'prompt'：始终提示、'merge'：保留文档格式、'crean'：保留文档结构，清除嵌套样式*/
        advlist_bullet_styles: 'square', /* 无序列表符号样式 */
        advlist_number_styles: 'default', /* 有序列表符号样式 */
        default_link_target: '_blank', /* a标签的target */
        link_title: true, /* a标签的title */
        nonbreaking_force_tab: true, /* 允许tab键缩进 */
        branding: false, /* 是否显示右下角的power by ... */
        imagetools_cors_hosts: ['www.tinymce.com', 'codepen.io'],
        init_instance_callback: editor => {
          if (_this.value) {
            editor.setContent(_this.value)
          }
          _this.hasInit = true
          editor.on('NodeChange Change KeyUp SetContent', () => {
            this.hasChange = true
            this.$emit('input', editor.getContent())
          })
        },
        setup (editor) {
          editor.on('FullscreenStateChanged', (e) => {
            _this.fullscreen = e.state
          })
        }
      })
    },
    destroyTinymce () {
      const tinymce = window.tinymce.get(this.tinymceId)
      if (this.fullscreen) {
        tinymce.execCommand('mceFullScreen')
      }

      if (tinymce) {
        tinymce.destroy()
      }
    },
    setContent (value) {
      window.tinymce.get(this.tinymceId).setContent(value)
    },
    getContent () {
      window.tinymce.get(this.tinymceId).getContent()
    },
    uploaderSuccess (arr) {
      const _this = this
      arr.forEach(v => {
        window.tinymce.get(_this.tinymceId).insertContent(`<img class="uploader-image" src="${v.url}" >`)
      })
    }
  },
  components: {
    ImageUploader
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.editor-wrapper {
  position: relative;
  line-height: normal;
  .editor-textarea {
    visibility: hidden;
    opacity: 0;
    z-index: -1;
  }
  .editor-custom-wrapper {
    position: absolute;
    right: 5px;
    top: 5px;
  }
  &.fullscreen {
    .editor-custom-wrapper {
      position: fixed;
      z-index: 10000;
    }
  }
}
</style>