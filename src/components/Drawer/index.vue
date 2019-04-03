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
.x-drawer {
  position: fixed;
  width: 0;
  height: 100%;
  top: 0;
  left: 0;
  z-index: 1000;

  &.x-drawer-open {
    width: 100%;
  }

  * {
    transition: transform 0.3s cubic-bezier(0.9, 0, 0.3, 0.7),
      box-shadow 0.3s cubic-bezier(0.9, 0, 0.3, 0.7);
  }

  .x-drawer-wrapper {
    position: fixed;
    height: 100%;

    .x-drawer-content {
      width: 100%;
      height: 100%;
      position: relative;
      z-index: 1;
      background-color: #fff;
    }
  }

  &.x-drawer-left .x-drawer-wrapper {
    left: 0;
    box-shadow: 2px 0 8px rgba(0, 0, 0, 0.15);
  }

  &.x-drawer-right .x-drawer-wrapper {
    right: 0;
    box-shadow: -2px 0 8px rgba(0, 0, 0, 0.15);
  }

  .x-drawer-mask {
    position: fixed;
    width: 100%;
    height: 0;
    background-color: rgba(0, 0, 0, 0.65);
    opacity: 0;
    filter: alpha(opacity=50);
    transition: opacity 0.3s linear, height 0s ease 0.3s;
    cursor: pointer;
  }

  &.x-drawer-open .x-drawer-mask {
    height: 100%;
    opacity: 0.3;
    transition: none;
    animation: x-drawer-fade-in 0.3s cubic-bezier(0.7, 0.3, 0.1, 1);
  }
}

@keyframes x-drawer-fade-in {
  0% {
    opacity: 0;
  }
  to {
    opacity: 0.3;
  }
}
</style>
