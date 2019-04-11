<template>
  <el-submenu :index="route.path"
              :popper-class="'sider-popup'">
    <template slot="title">
      <x-icon v-if="showIcon && route.meta && route.meta.icon"
              :icon="route.meta.icon"
              :type="route.meta.iconType" />
      <span slot="title">{{route.meta && route.meta.title ? route.meta.title : '-'}}</span>
    </template>
    <template v-for="item in route.children">
      <item-alone v-if="isAloneRoute(item) && item.meta && !item.meta.alwaysShow"
                  :route="item"
                  :showIcon="false"
                  :basePath="route.path"
                  :key="item.path"></item-alone>
      <item-nested v-else
                   :route="item"
                   :showIcon="false"
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
    },
    showIcon: {
      type: Boolean,
      default: true
    },
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
</style>
