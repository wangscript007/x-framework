<template>
  <page>
    <el-row>
      <el-col :span="24">
        <el-card shadow="never">
          <el-table
            v-loading="tableLoading"
            :data="tableData"
            style="width: 100%"
            stripe
            border
            fit
          >
            <el-table-column
              prop="date"
              label="日期"
            >
            </el-table-column>
            <el-table-column
              prop="name"
              label="姓名"
            >
            </el-table-column>
            <el-table-column
              prop="address"
              label="地址"
            >
            </el-table-column>
          </el-table>
        </el-card>
      </el-col>
    </el-row>
  </page>
</template>

<script>
import Page from '@/components/Page'

export default {
  name: 'BaseTable',
  components: {
    Page
  },
  data () {
    return {
      tableLoading: true,
      tableData: []
    }
  },
  created () {
    this.getTableData()
  },
  methods: {
    getTableData () {
      setTimeout(() => {
        this.tableLoading = false
        this.tableData = this.tableData.concat([
          {
            date: '2016-05-02',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1518 弄'
          }, {
            date: '2016-05-04',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1517 弄'
          }, {
            date: '2016-05-01',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1519 弄'
          }, {
            date: '2016-05-03',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1516 弄'
          }
        ])
      }, 1000)
    }
  }
}
</script>

<style scoped>
</style>
