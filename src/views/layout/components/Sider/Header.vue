<template>
  <div class="sider-header">
    <a href="/"
       :title="webside.title">
      <img :src="webside.logo"
           :alt="webside.title" />
      <transition name="sider-title">
        <h1 v-if="!collapsed"
            key="0">{{webside.title}}</h1>
      </transition>
    </a>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'SiderHeader',
  props: {
    collapsed: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    ...mapGetters(['webside'])
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
</style>
