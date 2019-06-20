import ItemAlone from '@/components/Layout/components/Sider/ItemAlone'

export default {
  methods: {
    /* 递归判断当前路由下的每一层嵌套是否只有一个子路由 */
    isAloneRoute (route, res = null) {
      const { children } = route
      if (!children) {
        res = true
      } else {
        let matchedLength = 0
        for (const child of children) {
          if (!child.meta || child.meta.hidden) {
            continue
          }
          matchedLength++
          if (matchedLength > 1) {
            res = false
            break
          }
          res = child.children && child.children.length > 0 ? this.isAloneRoute(child, res) : true
        }
      }
      return res
    }
  },
  components: {
    ItemAlone
  }
}
