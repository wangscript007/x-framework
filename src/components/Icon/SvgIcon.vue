<template>
  <svg
    class="svg-icon"
    :style="styles"
    aria-hidden="true"
  >
    <use :xlink:href="`#icon-${icon}`" />
  </svg>
</template>

<script>
export default {
  name: 'SvgIcon',
  props: {
    icon: {
      type: String,
      required: true
    },
    styles: {
      type: Object,
      default: null
    }
  }
}
</script>

<style>
  .svg-icon {
    width: 1em;
    height: 1em;
    fill: currentColor;
    overflow: hidden;
  }
</style>
