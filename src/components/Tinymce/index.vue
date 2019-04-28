<template>
  <div class="editor-wrapper">
    <editor
      :id="id"
      v-model="value"
      :name="name"
      :init="init"
      :disabled="disabled"
    ></editor>
    <div class="editor-custom-wrapper">
      <image-uploader
        ref="imageUploader"
        @uploaderSuccess="uploaderSuccess"
      ></image-uploader>
    </div>
  </div>
</template>

<script>
import tinymce from 'tinymce/tinymce'
import Editor from '@tinymce/tinymce-vue'
import 'tinymce/themes/silver'
import '@/components/Tinymce/plugins'
import * as options from '@/components/Tinymce/options'
import ImageUploader from '@/components/Tinymce/components/ImageUploader'

export default {
  name: 'Tinymce',
  components: {
    Editor,
    ImageUploader
  },
  model: {
    prop: 'content',
    event: 'contentChange'
  },
  props: {
    id: {
      type: String,
      default: function () {
        return 'vue-tinymce-' + +new Date() + ((Math.random() * 1000).toFixed(0) + '')
      }
    },
    name: {
      type: String,
      default: ''
    },
    content: {
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
      init: {
        selector: `#${this.id}`,
        language_url: '/static/libs/tinymce/langs/zh_CN.js',
        skin_url: '/static/libs/tinymce/skins/ui/oxide',
        content_css: '/static/libs/tinymce/skins/content/default/content.min.css',
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
        setup: (editor) => {
          editor.ui.registry.addButton('imageUploader', {
            tooltip: '插入图片',
            icon: 'image',
            onAction: () => {
              this.$refs['imageUploader'].openUploaderDialog()
            }
          })
        }
      },
      value: this.content
    }
  },
  watch: {
    content (newValue) {
      this.value = newValue
    },
    value (newValue) {
      this.$emit('contentChange', newValue)
    }
  },
  mounted () {
    tinymce.init({})
  },
  methods: {
    uploaderSuccess (arr) {
      arr.forEach(v => {
        tinymce.activeEditor.insertContent(`<img class="uploader-image" src="${v.url}" >`)
      })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.editor-wrapper {
  position: relative;
  line-height: normal;
  textarea {
    visibility: hidden;
    opacity: 0;
    z-index: -1;
    display: none;
  }
  .editor-custom-wrapper {
    position: absolute;
    right: 0;
  }
  /deep/ .tox-tinymce.tox-fullscreen {
    iframe.tox-edit-area__iframe {
      height: 100% !important;
    }
  }
}
</style>
