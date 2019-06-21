<template>
  <div class="x-settings-wrap">
    <h4 class="settings-title">布局设置</h4>
    <div class="settings-layout-type fix">
      <a
        href="javascript:void(0)"
        class="settings-layout-item default"
        :class="{active: app.layout === 'default'}"
        title="默认布局"
        @click="settings.layout = 'default'"
      >
        <x-icon
          icon="iconfont icon-check-circle-fill"
          type="class"
          class="icon-active"
        />
      </a>
      <a
        href="javascript:void(0)"
        class="settings-layout-item classic"
        :class="{active: app.layout === 'classic'}"
        title="经典布局"
        @click="settings.layout = 'classic'"
      >
        <x-icon
          icon="iconfont icon-check-circle-fill"
          type="class"
          class="icon-active"
        />
      </a>
    </div>
    <el-divider></el-divider>
    <h4 class="settings-title">导航栏及头部</h4>
    <div class="settings-others">
      <el-form
        :model="settings"
        size="mini"
        label-width="80px"
        label-position="left"
      >
        <el-form-item label="固定导航">
          <el-switch v-model="settings.siderFixed"></el-switch>
        </el-form-item>
        <el-form-item label="固定头部">
          <el-switch v-model="settings.headerFixed"></el-switch>
        </el-form-item>
        <el-form-item label="路径导航">
          <el-select
            v-model="settings.breadcrumbPosition"
            size="mini"
          >
            <el-option
              v-for="item in breadcrumbPosition"
              :key="item.value"
              :label="item.label"
              :value="item.value"
              :selected="item.value === settings.breadcrumbPosition"
            >
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
    </div>
    <el-divider></el-divider>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'

export default {
  name: 'Setting',
  data () {
    return {
      settings: {
        layout: '',
        siderFixed: false,
        headerFixed: false,
        breadcrumbPosition: ''
      },
      breadcrumbPosition: [
        {
          value: 'appHeader',
          label: '头部显示'
        }, {
          value: 'pageHeader',
          label: '页头显示'
        }
      ]
    }
  },
  computed: {
    ...mapGetters(['app'])
  },
  watch: {
    'settings.layout' (layout) {
      this.setLayout(layout)
    },
    'settings.siderFixed' (siderFixed) {
      this.setSiderFixed(siderFixed)
    },
    'settings.headerFixed' (headerFixed) {
      this.setHeaderFixed(headerFixed)
    },
    'settings.breadcrumbPosition' (breadcrumbPosition) {
      this.setBreadcrumbPosition(breadcrumbPosition)
    }
  },
  created () {
    this.settings.layout = this.app.layout
    this.settings.siderFixed = this.app.siderFixed
    this.settings.headerFixed = this.app.headerFixed
    this.settings.breadcrumbPosition = this.app.breadcrumbPosition
  },
  methods: {
    ...mapMutations({
      setLayout: 'SET_LAYOUT',
      setSiderFixed: 'SET_SIDER_FIXED',
      setHeaderFixed: 'SET_HEADER_FIXED',
      setBreadcrumbPosition: 'SET_BREADCRUMB_POSITION'
    })
  }
}
</script>
