<template>
  <scroll background="#000">
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
      <div class="settings-others margin-bottom-2x">
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
              :disabled="breadcrumbSelectDisabled"
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
      <el-alert
        type="primary"
        :closable="false"
        class="tips"
      >
        <template v-slot:title>
          <div class="margin-top-1x margin-bottom-1x"><strong>注意</strong></div>
          <div class="margin-bottom-1x">1、在经典布局模式下，头部和导航必须同时保持固定或非固定。</div>
          <div class="margin-bottom-1x">2、路径导航位置设置只在默认布局模式下有效。</div>
        </template>
      </el-alert>
      <el-divider></el-divider>
    </div>
  </scroll>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
import Scroll from '@/components/Scroll'

export default {
  name: 'Setting',
  components: {
    Scroll
  },
  data () {
    return {
      settings: {
        layout: '',
        siderFixed: false,
        headerFixed: false,
        breadcrumbPosition: ''
      },
      breadcrumbSelectDisabled: false,
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
      if (layout === 'classic') {
        if (this.settings.siderFixed !== this.settings.headerFixed) {
          this.settings.siderFixed = false
          this.settings.headerFixed = false
        }
      }
      this.breadcrumbSelectDisabled = layout === 'classic'
      this.setLayout(layout)
    },
    'settings.siderFixed' (siderFixed) {
      this.setSiderFixed(siderFixed)
      if (this.settings.layout === 'classic') {
        this.settings.headerFixed = siderFixed
      }
    },
    'settings.headerFixed' (headerFixed) {
      this.setHeaderFixed(headerFixed)
      if (this.settings.layout === 'classic') {
        this.settings.siderFixed = headerFixed
      }
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
    this.breadcrumbSelectDisabled = this.app.layout === 'classic'
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
