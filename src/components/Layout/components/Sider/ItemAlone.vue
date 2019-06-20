<template>
  <el-menu-item :index="matchedRoutePath">
    <item-link
      :external="matchedRoute.meta.external"
      :path="matchedRoutePath"
    >
      <x-icon
        v-if="showIcon && matchedRoute.meta.icon"
        :icon="matchedRoute.meta.icon"
        :type="matchedRoute.meta.iconType"
      />
      <span>{{ matchedRoute.meta.title || '' }}</span>
    </item-link>
  </el-menu-item>
</template>

<script>
import path from 'path'
import ItemLink from '@/components/Layout/components/Sider/ItemLink'

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
    basePath: {
      type: String,
      default: ''
    }
  },
  computed: {
    /* 根据子路由个数筛选出最终显示的路由 */
    matchedRoute () {
      return this.findMatchedRoute(this.route)
    },
    /* 最终显示的路由的path */
    matchedRoutePath () {
      return this.matchedRoute.meta.external ? this.matchedRoute.path : this.generatePath(this.route, this.basePath)
    }
  },
  methods: {
    /* 寻找匹配的子路由 */
    findMatchedRoute (route, matched = null) {
      if (!route.children) {
        matched = route
      } else {
        const matchedChild = route.children.find(child => {
          return child.meta && !child.meta.hidden
        })
        if (matchedChild) {
          matched = !matchedChild.children ? matchedChild : this.findMatchedRoute(matchedChild)
        }
      }
      return matched
    },
    /* 组装path */
    generatePath (route, res) {
      res = path.resolve(res, route.path)
      if (route.children && route.children.length > 0) {
        route.children.find(child => {
          if (!child.meta || child.meta.hidden) {
            return false
          }
          res = path.resolve(res, !child.children ? child.path : this.generatePath(child, res))
        })
      }
      return res
    }
  }
}
</script>

