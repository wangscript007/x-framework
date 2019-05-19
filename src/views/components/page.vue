<template>
  <page>
    <el-row>
      <el-col :span="24">
        <el-card
          shadow="never"
          class="layout-card-mg-b"
        >
          <div
            slot="header"
            class="fix"
          >
            <strong class="el-card__header-title">卡片名称</strong>
            <el-button
              class="el-card__header-btn float-right"
              type="text"
            >
              操作按钮
            </el-button>
          </div>
          <div class="text item">
            这里是内容
          </div>
        </el-card>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col
        :md="{span:12}"
        :sm="{span:24}"
      >
        <el-card
          shadow="never"
          class="layout-card-mg-b"
        >
          <div
            slot="header"
            class="fix"
          >
            <strong class="el-card__header-title">卡片名称</strong>
            <el-button
              class="el-card__header-btn float-right"
              type="text"
            >
              操作按钮
            </el-button>
          </div>
          <div class="text item">
            这里是内容
          </div>
        </el-card>
      </el-col>
      <el-col
        :md="{span:12}"
        :sm="{span:24}"
      >
        <el-card
          shadow="never"
          class="layout-card-mg-b"
        >
          <div
            slot="header"
            class="fix"
          >
            <strong class="el-card__header-title">卡片名称</strong>
            <el-button
              class="el-card__header-btn float-right"
              type="text"
            >
              操作按钮
            </el-button>
          </div>
          <div class="text item">
            这里是内容
          </div>
        </el-card>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <el-card
          shadow="never"
          class="layout-card-mg-b"
        >
          <div
            slot="header"
            class="fix"
          >
            <strong class="el-card__header-title">卡片名称</strong>
            <el-button
              class="el-card__header-btn float-right"
              type="text"
            >
              操作按钮
            </el-button>
          </div>
          <div class="text item">
            这里是内容
          </div>
        </el-card>
      </el-col>
    </el-row>
  </page>
</template>

<script>
import Page from '@/components/Page'
export default {
  name: 'Template',
  components: {
    Page
  }
}
</script>

<style scoped>
.layout-card-mg-b {
  margin-bottom: 20px;
}
</style>
