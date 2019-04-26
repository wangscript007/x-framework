<template>
  <el-breadcrumb class="app-breadcrumb"
                 separator="/">
    <transition-group name="breadcrumb">
      <el-breadcrumb-item
        v-for="(item,index) in breadcrumb"
        :key="item.path"
      >
        <span
          v-if="item.meta.redirectInBreadcrumb === false || index === breadcrumb.length - 1"
          class="no-redirect"
        >{{ item.meta.title }}</span>
        <a
          v-else
          @click.prevent="handleLink(item)">{{ item.meta.title }}</a>
      </el-breadcrumb-item>
    </transition-group>
  </el-breadcrumb>
</template>

<script>
import pathToRegexp from 'path-to-regexp'

export default {
  data () {
    return {
      breadcrumb: null
    }
  },
  watch: {
    $route () {
      this.getBreadcrumb()
    }
  },
  created () {
    this.getBreadcrumb()
  },
  methods: {
    getBreadcrumb () {
      let matched = this.$route.matched
      const first = matched[0]
      if (first && first.name.trim().toLocaleLowerCase() !== 'base') {
        matched = [{ path: '/', redirect: '/', meta: { title: '首页' } }].concat(matched)
      }
      this.breadcrumb = matched.filter(item => item.meta && item.meta.title && item.meta.showInBreadcrumb !== false)
    },
    pathCompile (path) {
      const { params } = this.$route
      var toPath = pathToRegexp.compile(path)
      return toPath(params)
    },
    handleLink (item) {
      const { redirect, path } = item
      if (redirect) {
        this.$router.push(redirect)
        return
      }
      this.$router.push(this.pathCompile(path))
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
</style>
