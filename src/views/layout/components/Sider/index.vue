<template>
  <div
    class="x-layout-sider"
    :class="{collapsed: collapsed, fixed: fixed}"
  >
    <div
      class="sider"
      :class="{fixed: fixed}"
    >
      <sider-header :collapsed="collapsed"></sider-header>
      <div class="sider-nav">
        <scroll>
          <el-menu
            :default-active="activePath"
            :collapse="collapsed"
            :collapse-transition="true"
            :router="false"
            :unique-opened="true"
          >
            <template v-for="item in routers">
              <template v-if="item.meta && !item.meta.hidden">
                <item-alone
                  v-if="isAloneRoute(item) && !item.meta.alwaysShow"
                  :key="item.path"
                  :route="item"
                  :base-path="item.path"
                ></item-alone>
                <item-nested
                  v-else
                  :key="item.path"
                  :route="item"
                  :base-path="item.path"
                ></item-nested>
              </template>
            </template>
          </el-menu>
        </scroll>
      </div>
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
  components: {
    SiderHeader,
    Scroll,
    ItemNested
  },
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
  computed: {
    activePath () {
      const { meta, path } = this.$route
      return meta && meta.activePath ? meta.activePath : path
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
</style>
