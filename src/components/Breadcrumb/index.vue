<template>
  <el-breadcrumb separator-class="el-icon-arrow-right">
    <transition-group
      name="animate-breadcrumb"
      mode="out-in"
    >
      <el-breadcrumb-item
        v-for="(item,index) in breadcrumb"
        :key="item.path"
      >
        <span
          v-if="item.meta.redirectInBreadcrumb === false || index === breadcrumb.length - 1"
          class="no-redirect"
        >
          {{ item.meta.title }}
        </span>
        <a
          v-else
          @click.prevent="handleLink(item)"
        >
          {{ item.meta.title }}
        </a>
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
      this.breadcrumb = [{ path: '/', redirect: '/', meta: { title: '首页' } }].concat(this.$route.matched).filter(item => item.meta && item.meta.title && item.meta.showInBreadcrumb !== false)
    },
    pathCompile (path) {
      const { params } = this.$route
      const toPath = pathToRegexp.compile(path)
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

