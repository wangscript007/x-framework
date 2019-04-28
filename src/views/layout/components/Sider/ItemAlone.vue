<template>
  <el-menu-item :index="matchedRoutePath">
    <item-link
      :external="matchedRoute.meta && matchedRoute.meta.external"
      :path="matchedRoutePath"
    >
      <x-icon
        v-if="showIcon && matchedRoute.meta && matchedRoute.meta.icon"
        :icon="matchedRoute.meta.icon"
        :type="matchedRoute.meta.iconType"
      />
      <span>{{ matchedRoute.meta && matchedRoute.meta.title ? matchedRoute.meta.title : '-' }}</span>
    </item-link>
  </el-menu-item>
</template>

<script>
import path from 'path'
import ItemLink from '@/views/layout/components/Sider/ItemLink'

export default {
  name: 'ItemAlone',
  components: {
    ItemLink
  },
  props: {
    route: {
      type: Object,
      required: true
    },
    showIcon: {
      type: Boolean,
      default: true
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
      return this.route.meta && this.route.meta.external ? this.route.path : this.resolvePath(
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
