<template>
  <i
    class="image-icon"
    :style="styleObj"
  >
  </i>
</template>

<script>
export default {
  name: 'ImageIcon',
  props: {
    icon: {
      type: String,
      required: true
    },
    styles: {
      type: Object,
      default: null
    }
  },
  computed: {
    styleObj () {
      return Object.assign({ backgroundImage: `url(${this.icon})` }, this.styles)
    }
  }
}
</script>

<style>
  .image-icon {
    display: inline-block;
    width: 1em;
    height: 1em;
    background-size: auto 100%;
    background-position: center center;
    background-repeat: no-repeat;
  }
</style>
