<template>
  <page>
    <el-row>
      <el-col :span="24">
        <el-card shadow="never">
          <el-table
            :key="tableId"
            v-loading="tableLoading"
            :data="staffList"
            style="width: 100%"
            stripe
            border
            fit
            highlight-current-row
          >
            <el-table-column
              type="index"
              width="50"
              align="center"
              fixed
            >
            </el-table-column>
            <el-table-column
              prop="staffName"
              label="姓名"
              width="80"
              align="center"
              fixed
            >
            </el-table-column>
            <el-table-column
              prop="staffNo"
              label="工号"
              width="130"
              align="center"
            >
            </el-table-column>
            <el-table-column
              prop="cerNo"
              label="身份证号"
              width="160"
              align="center"
            >
            </el-table-column>
            <el-table-column
              label="性别"
              width="50"
              align="center"
            >
              <template slot-scope="scope">
                <span>{{ scope.row.sex === '1' ? '男' : '女' }}</span>
              </template>
            </el-table-column>
            <el-table-column
              prop="native"
              label="籍贯"
            >
            </el-table-column>
            <el-table-column
              prop="entryTime"
              label="入职时间"
              width="100"
              align="center"
            >
            </el-table-column>
            <el-table-column
              prop="address"
              label="联系地址"
            >
            </el-table-column>
            <el-table-column
              label="状态"
              width="60"
              align="center"
            >
              <template slot-scope="scope">
                <strong v-if="scope.row.state === '1'">
                  在职
                </strong>
                <strong
                  v-else
                  style="color: #F56C6C;"
                >
                  离职
                </strong>
              </template>
            </el-table-column>
            <el-table-column
              label="操作"
              width="160"
              align="center"
            >
              <template slot-scope="{row}">
                <el-button
                  type="warning"
                  size="mini"
                  @click="editStaff(row)"
                >
                  编辑
                </el-button>
                &nbsp;
                <el-popover
                  placement="top"
                  width="160"
                >
                  <p>确定删除该员工？</p>
                  <div class="text-right">
                    <el-button
                      size="mini"
                      type="text"
                      @click="deleteTips = false"
                    >取消</el-button>
                    <el-button
                      type="primary"
                      size="mini"
                      @click="deleteStaff(row)"
                    >确定</el-button>
                  </div>
                  <el-button
                    slot="reference"
                    type="danger"
                    size="mini"
                    @click="deleteTips = true"
                  >
                    删除
                  </el-button>
                </el-popover>
              </template>
            </el-table-column>
          </el-table>
        </el-card>
      </el-col>
    </el-row>
  </page>
</template>

<script>
import { staffList } from '@/api/staff'
import Page from '@/components/Page'

export default {
  name: 'ComplexTable',
  components: {
    Page
  },
  data () {
    return {
      tableId: 0,
      tableLoading: false,
      total: 0,
      staffList: [],
      query: {
        staffName: '',
        cerNo: '',
        sex: '',
        state: '',
        pageNo: 1,
        pageSize: 10
      }
    }
  },
  created () {
    this.getStaff()
  },
  methods: {
    getStaff: async function () {
      try {
        this.tableLoading = true
        const res = await staffList(this.query)
        if (res.data) {
          this.staffList = res.data.data || []
          this.total = res.data.total || 0
        }
        this.$nextTick(() => {
          this.tableLoading = false
        })
      } catch (error) {
        this.tableLoading = false
        this.$message({
          showClose: true,
          type: 'error',
          message: error.message
        })
      }
    },
    editStaff (row) {
      console.log(row)
    },
    deleteStaff (row) {
      console.log(row)
      this.deleteTips = false
    }
  }
}
</script>

<style scoped>
</style>
