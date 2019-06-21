<template>
  <div
    class="x-sider"
    :class="{fixed: fixed, 'with-header': showHeader}"
  >
    <sider-header
      v-if="showHeader"
      :collapsed="collapsed"
    ></sider-header>
    <div class="x-sider-nav">
      <scroll>
        <el-menu
          :default-active="activePath"
          :collapse="collapsed"
          :collapse-transition="true"
          :router="false"
          :unique-opened="true"
        >
          <template v-for="item in permission.routers">
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
</template>

<script>
import { mapGetters } from 'vuex'
import Scroll from '@/components/Scroll'
import SiderHeader from '@/components/Layout/components/Sider/Header'
import SiderMixin from '@/components/Layout/mixin/Sider'
import ItemNested from '@/components/Layout/components/Sider/ItemNested'

export default {
  name: 'LayoutSider',
  components: {
    SiderHeader,
    Scroll,
    ItemNested
  },
  mixins: [SiderMixin],
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
  computed: {
    ...mapGetters(['permission']),
    activePath () {
      const { meta, path } = this.$route
      return meta && meta.activePath ? meta.activePath : path
    }
  }
}
</script>

