<template>
  <div
    class="x-sider"
    :class="{fixed: fixed, 'with-header': showHeader}"
  >
    <sidebar-header
      v-if="showHeader"
      :collapsed="collapsed"
    />
    <div class="x-sider-nav">
      <scroll>
        <el-menu
          :default-active="activePath"
          :collapse="collapsed"
          :collapse-transition="true"
          :router="false"
          :unique-opened="true"
        >
          <template v-for="item in menus">
            <template v-if="!item.meta.hidden">
              <item-alone
                v-if="isAloneRoute(item) && !item.meta.alwaysShow"
                :key="item.path"
                :route="item"
              />
              <item-nested
                v-else
                :key="item.path"
                :route="item"
              />
            </template>
          </template>
        </el-menu>
      </scroll>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import Scroll from '@/components/Scroll'
import SidebarHeader from '@/layout/components/Sidebar/Header'
import SidebarMixin from '@/layout/mixin/Sidebar'
import ItemNested from '@/layout/components/Sidebar/ItemNested'

export default {
  name: 'Sidebar',
  components: {
    SidebarHeader,
    Scroll,
    ItemNested
  },
  mixins: [SidebarMixin],
  props: {
    collapsed: {
      type: Boolean,
      default: false
    },
    fixed: {
      type: Boolean,
      default: false
    },
    showHeader: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      menus: []
    }
  },
  computed: {
    ...mapState({
      mainMenu: state => state.permission.addRouters
    }),
    activePath () {
      const { meta, path } = this.$route
      return meta && meta.activePath ? meta.activePath : path
    }
  },
  created () {
    this.menus = this.mainMenu.find(item => item.path === '/').children
  }
}
</script>

