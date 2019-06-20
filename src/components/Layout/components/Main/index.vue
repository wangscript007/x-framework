<template>
  <transition
    name="animate-layout-main"
    mode="out-in"
  >
    <router-view :key="key" />
  </transition>
</template>

<script>
export default {
  name: 'LayoutMain',
  computed: {
    key () {
      return this.$route.fullPath
    }
  }
}
</script>

