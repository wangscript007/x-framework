import ItemAlone from '@/views/layout/components/Sider/ItemAlone'

export default {
  methods: {
    isAloneRoute (route) {
      const length = route.children
        ? route.children.filter(route => {
          return route.meta && !route.meta.hidden
        }).length
        : 0
      return length === 0 || length === 1
    }
  },
  components: {
    ItemAlone
  }
}
