<template>
  <div>
    <h1 v-if="!permission.defaultPath"
        class="text-center index-msg"
        v-html="message"></h1>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Index',
  data () {
    return {
        message: ''
    }
  },
  computed: {
    ...mapGetters(['permission'])
  },
  created () {
    if (!this.permission.defaultPath) {
        this.message = '您好，您尚未有该系统的操作权限</br>请联系管理员'
    } else {
        this.$router.push(this.permission.defaultPath)
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.index-msg {
  position: fixed;
  width: 100%;
  margin: 0;
  padding: 0;
  top: 40%;
}
</style>