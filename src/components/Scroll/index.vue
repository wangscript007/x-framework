<template>
  <scroll :ops="ops">
    <slot></slot>
  </scroll>
</template>

<script>
import Scroll from 'vuescroll'

export default {
  components: {
    Scroll
  },
  props: {
    mode: {
      type: String,
      default: 'native'
    },
    detectResize: {
      type: Boolean,
      default: true
    },
    scrollingX: {
      type: Boolean,
      default: false
    },
    scrollingY: {
      type: Boolean,
      default: true
    },
    size: {
      type: String,
      default: '4px'
    },
    background: {
      type: String,
      default: '#fff'
    },
    opacity: {
      type: Number,
      default: 0.3
    },
    onlyShowBarOnScroll: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      ops: {
        vuescroll: {},
        scrollPanel: {},
        rail: {},
        bar: {}
      }
    }
  },
  created () {
    this.ops.vuescroll.mode = this.mode
    this.ops.vuescroll.detectResize = this.detectResize

    this.ops.scrollPanel.scrollingX = this.scrollingX
    this.ops.scrollPanel.scrollingY = this.scrollingY

    this.ops.bar.size = this.size
    this.ops.bar.background = this.background
    this.ops.bar.opacity = this.opacity
    this.ops.bar.onlyShowBarOnScroll = this.onlyShowBarOnScroll
  }
}
</script>

<style rel="stylesheet/scss" lang="sass" scoped>
</style>
