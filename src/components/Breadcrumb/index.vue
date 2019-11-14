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
        <router-link
          v-if="item.name !== name && index !== 1"
          :to="item.path || '/'"
        >
          {{ item.meta.title }}
        </router-link>
        <span
          v-else
          class="no-redirect"
        >
          {{ item.meta.title }}
        </span>
      </el-breadcrumb-item>
    </transition-group>
  </el-breadcrumb>
</template>

<script>
export default {
  data () {
    return {
      name: '',
      breadcrumb: []
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
      this.breadcrumb = []
      this.name = this.$route.name
      this.$route.matched.forEach(item => {
        this.breadcrumb.push(item)
      })
    }
  }
}
</script>

