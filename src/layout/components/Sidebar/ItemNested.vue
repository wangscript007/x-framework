<template>
  <el-submenu
    :index="route.path"
    popper-class="x-sider-popup"
  >
    <template v-slot:title>
      <x-icon
        v-if="showIcon && route.meta.icon"
        :icon="route.meta.icon"
        :type="route.meta.iconType"
      />
      <span>{{ route.meta.title || '' }}</span>
    </template>
    <template v-for="item in route.children">
      <template v-if="!item.meta.hidden">
        <item-alone
          v-if="isAloneRoute(item) && !item.meta.alwaysShow"
          :key="item.path"
          :route="item"
          :show-icon="false"
        />
        <item-nested
          v-else
          :key="item.path"
          :route="item"
          :show-icon="false"
        />
      </template>
    </template>
  </el-submenu>
</template>

<script>
import sidebarMixin from '@/layout/mixin/Sidebar'

export default {
  name: 'ItemNested',
  mixins: [sidebarMixin],
  props: {
    route: {
      type: Object,
      required: true
    },
    showIcon: {
      type: Boolean,
      default: true
    }
  }
}
</script>

