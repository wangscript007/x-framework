<template>
  <el-submenu :index="route.path"
              :popper-class="'sider-popup'">
    <template slot="title">
      <svg-icon v-if="route.meta && route.meta.icon"
                :icon-class="route.meta.icon" />
      <span slot="title">{{route.meta && route.meta.title ? route.meta.title : '-'}}</span>
    </template>
    <template v-for="item in route.children">
      <item-alone v-if="isAloneRoute(item) && item.meta && !item.meta.alwaysShow"
                  :route="item"
                  :basePath="route.path"
                  :key="item.path"></item-alone>
      <item-nested v-else
                   :route="item"
                   :key="item.path"></item-nested>
    </template>
  </el-submenu>
</template>

<script>
import siderMixin from '@/views/layout/mixin/Sider'
export default {
  name: 'ItemNested',
  mixins: [siderMixin],
  props: {
    route: {
      type: Object,
      required: true
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
</style>
