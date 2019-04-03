<template>
  <div class="x-layout-sider"
       :class="{collapsed: collapsed, fixed: fixed}">
    <sider-header :collapsed="collapsed"></sider-header>
    <div class="sider-nav">
      <scroll>
        <el-menu :defaultActive="$route.path"
                 :collapse="collapsed"
                 :collapseTransition="true"
                 :router="false">
          <template v-for="item in routers">
            <template v-if="item.meta && !item.meta.hidden">
              <item-alone v-if="isAloneRoute(item) && item.meta && !item.meta.alwaysShow"
                          :route="item"
                          :basePath="item.path"
                          :key="item.path"></item-alone>
              <item-nested v-else
                           :route="item"
                           :key="item.path"></item-nested>
            </template>
          </template>
        </el-menu>
      </scroll>
    </div>
  </div>
</template>

<script>
import SiderMixin from '@/views/layout/mixin/Sider'
import Scroll from '@/components/Scroll'
import SiderHeader from '@/views/layout/components/Sider/Header'
import ItemNested from '@/views/layout/components/Sider/ItemNested'

export default {
  name: 'LayoutSider',
  mixins: [SiderMixin],
  props: {
    routers: {
      type: Array,
      default: () => []
    },
    collapsed: {
      type: Boolean,
      default: false
    },
    fixed: {
      type: Boolean,
      default: false
    }
  },
  components: {
    SiderHeader,
    Scroll,
    ItemNested
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
</style>
