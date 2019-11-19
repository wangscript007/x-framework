<script type="text/jsx">
export default {
  name: 'RouteView',
  props: {
    keepAlive: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {}
  },
  render (h) {
    const { $route: { meta } } = this
    const inKeep = (<keep-alive><router-view /></keep-alive>)
    const notKeep = (<router-view />)
    return this.keepAlive || meta.keepAlive ? inKeep : notKeep
  }
}
</script>
