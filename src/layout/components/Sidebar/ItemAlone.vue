<template>
  <el-menu-item :index="matchedRoute.path">
    <item-link
      :target="matchedRoute.meta.target"
      :path="matchedRoute.path"
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
import ItemLink from '@/layout/components/Sidebar/ItemLink'

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
    }
  },
  computed: {
    /* 根据子路由个数筛选出最终显示的路由 */
    matchedRoute () {
      return this.findMatchedRoute(this.route)
    }
  },
  methods: {
    /* 寻找匹配的子路由 */
    findMatchedRoute (route, matched = null) {
      if (!route.children) {
        matched = route
      } else {
        const matchedChild = route.children.find(child => {
          return !child.meta.hidden
        })
        if (matchedChild) {
          matched = !matchedChild.children ? matchedChild : this.findMatchedRoute(matchedChild)
        }
      }
      return matched
    }
  }
}
</script>

