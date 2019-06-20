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
    external: {
      type: Boolean,
      default: false
    },
    path: {
      type: String,
      default: ''
    }
  },
  computed: {
    linkType () {
      return this.external ? 'a' : 'router-link'
    },
    linkProps () {
      return this.external ? { href: this.path, target: '_blank' } : { to: this.path, tag: 'a' }
    }
  }
}
</script>

