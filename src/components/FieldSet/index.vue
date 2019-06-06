<template>
  <div
    class="x-field-set"
    :style="styles"
  >
    <div class="x-field-set-legend">
      <span v-if="title">{{ title }}</span>
      <slot
        v-else
        name="title"
      ></slot>
    </div>
    <div class="x-field-set-content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'FieldSet',
  props: {
    title: {
      type: String,
      default: ''
    },
    spaceTop: {
      type: Number,
      default: -1
    }
  },
  computed: {
    styles () {
      return this.spaceTop === -1 ? null : { 'padding-top': `${this.spaceTop}px` }
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
</style>
