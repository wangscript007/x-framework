<template>
  <i
    class="class-icon"
    :class="icon"
    :style="styles"
  >
  </i>
</template>

<script>
export default {
  name: 'ClassIcon',
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
  .class-icon {
    width: 1em;
    height: 1em;
    font-size: 1em;
    line-height: 1em;
  }
</style>
