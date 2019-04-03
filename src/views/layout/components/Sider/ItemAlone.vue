<template>
  <el-menu-item :index="matchedRoutePath">
    <svg-icon v-if="matchedRoute.meta && matchedRoute.meta.icon"
              :icon-class="matchedRoute.meta.icon" />
    <span slot="title">{{ matchedRoute.meta && matchedRoute.meta.title ? matchedRoute.meta.title : '-'}}</span>
  </el-menu-item>
</template>

<script>
import path from 'path'

export default {
  name: 'ItemAlone',
  props: {
    route: {
      type: Object,
      required: true
    },
    /* 父级路由的path */
    basePath: {
      type: String,
      default: ''
    }
  },
  computed: {
    /* 过滤掉隐藏的子路由之后剩余的子路由个数 */
    matchedChildrenLength () {
      return this.route.children
        ? this.route.children.filter(item => {
          return item.meta && !item.meta.hidden
        }).length
        : 0
    },
    /* 根据子路由个数筛选出最终显示的路由 */
    matchedRoute () {
      return this.matchedChildrenLength === 0 ? this.route : this.route.children[0]
    },
    /* 最终显示的路由的path */
    matchedRoutePath () {
      return this.resolvePath(
        this.matchedChildrenLength === 0
          ? this.route.path
          : `${this.route.path}/${this.route.children[0].path}`
      )
    }
  },
  methods: {
    /* 拼接路由path */
    resolvePath (routePath) {
      return path.resolve(this.basePath, routePath)
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
</style>
