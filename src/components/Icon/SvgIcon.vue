<template>
  <svg :style="styles"
       class="svg-icon"
       aria-hidden="true">
    <use :xlink:href="`#icon-${icon}`"></use>
  </svg>
</template>

<script>
export default {
  name: 'icon-svg',
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
