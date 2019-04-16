<template>
  <page>
    <el-row class="layout-row">
      <el-col :span="24">
        <el-card shadow="never">
          <div slot="header"
               class="clearfix">
            <strong>卡片名称</strong>
            <el-button style="float: right; padding: 3px 0"
                       type="text">操作按钮</el-button>
          </div>
          <div class="text item">
            这里是内容
          </div>
        </el-card>
      </el-col>
    </el-row>
    <el-row class="layout-row"
            :gutter="20">
      <el-col :span="12">
        <el-card shadow="never">
          <div slot="header"
               class="clearfix">
            <strong>卡片名称</strong>
            <el-button style="float: right; padding: 3px 0"
                       type="text">操作按钮</el-button>
          </div>
          <div class="text item">
            这里是内容
          </div>
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card shadow="never">
          <div slot="header"
               class="clearfix">
            <strong>卡片名称</strong>
            <el-button style="float: right; padding: 3px 0"
                       type="text">操作按钮</el-button>
          </div>
          <div class="text item">
            这里是内容
          </div>
        </el-card>
      </el-col>
    </el-row>
    <el-row class="layout-row">
      <el-col :span="24">
        <el-card shadow="never">
          <div slot="header"
               class="clearfix">
            <strong>卡片名称</strong>
            <el-button style="float: right; padding: 3px 0"
                       type="text">操作按钮</el-button>
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
.layout-row {
  margin-bottom: 20px;
}
</style>
