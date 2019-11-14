<template>
  <component
    :is="linkType"
    v-bind="linkProps"
  >
    <slot />
  </component>
</template>

<script>
export default {
  name: 'ItemLink',
  props: {
    target: {
      type: String,
      default: null
    },
    path: {
      type: String,
      default: ''
    }
  },
  computed: {
    linkType () {
      return this.target ? 'a' : 'router-link'
    },
    linkProps () {
      return this.target ? { href: this.path, target: this.target } : { to: this.path, tag: 'a' }
    }
  }
}
</script>

