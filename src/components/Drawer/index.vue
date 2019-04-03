<template>
  <div>
    <div class="x-drawer"
         :class="drawerClasses">
      <div class="x-drawer-mask"
           @click.stop="maskClick()"></div>
      <div class="x-drawer-wrapper"
           :style="wrapperStyles">
        <div class="x-drawer-content">
          <slot></slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { hasScrollBar, getScrollbarWidth } from '@/common/utils'

export default {
  name: 'drawer',
  props: {
    type: {
      type: String,
      default: 'left'
    },
    width: {
      type: Number,
      default: 256
    },
    opened: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    drawerClasses () {
      return {
        'x-drawer-open': this.opened,
        'x-drawer-left': this.type === 'left',
        'x-drawer-right': this.type === 'right'
      }
    },
    wrapperStyles () {
      return {
        width: `${this.width}px`,
        transform: `translateX(${
          this.opened
            ? '0'
            : this.type === 'left'
              ? '-100'
              : this.type === 'right'
                ? '100'
                : '0'
        }%)`
      }
    }
  },
  watch: {
    opened (value) {
      document.body.style.cssText = `${
        value && hasScrollBar()
          ? `margin-right: ${getScrollbarWidth()}px; `
          : ''
      }overflow-y: ${value ? 'hidden' : 'auto'}`
    }
  },
  methods: {
    maskClick () {
      this.$emit('maskClick')
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
</style>
