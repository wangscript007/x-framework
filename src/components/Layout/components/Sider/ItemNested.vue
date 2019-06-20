<template>
  <el-submenu
    :index="route.path"
    popper-class="x-sider-popup"
  >
    <template v-slot:title>
      <x-icon
        v-if="showIcon && route.meta && route.meta.icon"
        :icon="route.meta.icon"
        :type="route.meta.iconType"
      />
      <span>{{ route.meta && route.meta.title ? route.meta.title : '' }}</span>
    </template>
    <template v-for="item in route.children">
      <template v-if="item.meta && !item.meta.hidden">
        <item-alone
          v-if="isAloneRoute(item) && !item.meta.alwaysShow"
          :key="item.path"
          :route="item"
          :show-icon="false"
          :base-path="basePath"
        ></item-alone>
        <item-nested
          v-else
          :key="item.path"
          :route="item"
          :show-icon="false"
          :base-path="resolvePath(item.path)"
        ></item-nested>
      </template>
    </template>
  </el-submenu>
</template>

<script>
import path from 'path'
import siderMixin from '@/components/Layout/mixin/Sider'

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
    basePath: {
      type: String,
      default: ''
    }
  },
  methods: {
    /* 拼接路由path */
    resolvePath (routePath) {
      return path.resolve(this.basePath, routePath)
    }
  }
}
</script>

