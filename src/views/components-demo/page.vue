<template>
  <page>
    <el-row>
      <el-col :span="24">
        <card title="Card标题"
              icon="fa fa-tags"
              icon-type="class">
          这里是内容
        </card>
      </el-col>
    </el-row>
  </page>
</template>

<script>
import Page from '@/components/Page'
import Card from '@/components/Card'
export default {
  name: 'Template',
  components: {
    Page,
    Card
  }
}
</script>

<style scoped>
</style>
