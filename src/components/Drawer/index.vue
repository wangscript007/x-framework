<template>
  <div :class="className">
    <div
      class="x-drawer"
      :class="drawerStyles"
    >
      <div
        class="x-drawer-mask"
        @click.stop="maskClick()"
      ></div>
      <div
        class="x-drawer-wrapper"
        :style="wrapperStyles"
      >
        <div class="x-drawer-content">
          <slot></slot>
        </div>
      </div>
      <div
        class="x-drawer-handler"
        :style="handlerStyles"
      >
        <slot name="handler"></slot>
      </div>
    </div>
  </div>
</template>

<script>
import { hasScrollBar, getScrollbarWidth } from '@/common/utils'

export default {
  name: 'Drawer',
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
    },
    handlerTop: {
      type: String,
      default: '0'
    },
    className: {
      type: String,
      default: ''
    }
  },
  computed: {
    drawerStyles () {
      return {
        'x-drawer-open': this.opened,
        'x-drawer-left': this.type === 'left',
        'x-drawer-right': this.type === 'right'
      }
    },
    wrapperStyles () {
      return {
        width: `${this.width}px`,
        transform: `translateX(${this.opened ? '0' : this.type === 'left' ? '-100' : this.type === 'right' ? '100' : '0'}%)`
      }
    },
    handlerStyles () {
      return {
        top: this.handlerTop,
        transform: `translateX(${this.opened ? (this.type === 'left' ? this.width + 'px' : this.type === 'right' ? -this.width + 'px' : '0') : '0'})`
      }
    }
  },
  watch: {
    opened (value) {
      document.body.style.cssText = `${value && hasScrollBar() ? `margin-right: ${getScrollbarWidth()}px; ` : ''}overflow-y: ${value ? 'hidden' : 'auto'}`
    }
  },
  destroyed () {
    document.body.style.cssText = 'margin-right: 0;overflow-y: auto;'
  },
  methods: {
    maskClick () {
      this.$emit('maskClick')
    }
  }
}
</script>

