<script>
export default {
  name: 'Index',
  created () {
    this.$router.push(this.$store.getters.permission.defaultPath || '/401')
  },
  render: function (h) {
    return h()
  }
}
</script>