<template>
  <page>
    <el-card shadow="never">
      <div class="complex-table">
        <div class="filter-wrap">
          <span class="filter-item">
            <el-input
              v-model="query.key"
              placeholder="姓名/工号/身份证号"
            />
          </span>
          <span class="filter-item">
            <el-select
              v-model="query.sex"
              placeholder="性别"
              clearable
              style="width: 90px;"
              @change="searchStaff"
            >
              <el-option
                label="男"
                value="1"
              />
              <el-option
                label="女"
                value="2"
              />
            </el-select>
          </span>
          <span class="filter-item">
            <el-select
              v-model="query.state"
              placeholder="状态"
              clearable
              style="width: 90px;"
              @change="searchStaff"
            >
              <el-option
                label="在职"
                value="1"
              />
              <el-option
                label="离职"
                value="2"
              />
            </el-select>
          </span>
          <span class="filter-item">
            <el-button
              type="default"
              icon="el-icon-search"
              @click="searchStaff"
            >
              查询
            </el-button>
          </span>
          <span class="filter-item">
            <el-button
              type="primary"
              icon="iconfont icon-plus"
              @click="addStaff"
            >
              添加
            </el-button>
          </span>
        </div>
        <div class="table-wrap">
          <el-table
            :key="tableId"
            v-loading="tableLoading"
            :data="staffList"
            style="width: 100%"
            stripe
            fit
            highlight-current-row
          >
            <el-table-column
              label="#"
              width="50"
              fixed
            >
              <template slot-scope="scope">
                <span>{{ (query.pageNo - 1) * query.pageSize + 1 + scope.$index }}</span>
              </template>
            </el-table-column>
            <el-table-column
              prop="staffName"
              label="姓名"
              width="80"
              fixed
            >
            </el-table-column>
            <el-table-column
              prop="staffNo"
              label="工号"
              width="130"
            >
            </el-table-column>
            <el-table-column
              prop="cerNo"
              label="身份证号"
              width="160"
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
            >
            </el-table-column>
            <el-table-column
              label="状态"
              width="80"
            >
              <template slot-scope="scope">
                <badge :status="scope.row.state === '1'? 'success' : 'error'">
                  {{ scope.row.state === '1'? '在职' : '离职' }}
                </badge>
              </template>
            </el-table-column>
            <el-table-column
              label="操作"
              width="100"
              fixed="right"
            >
              <template slot-scope="{row}">
                <el-link
                  type="primary"
                  @click="editStaff(row)"
                >
                  编辑
                </el-link>
                &nbsp;
                <el-link
                  type="primary"
                  @click="deleteStaff(row)"
                >
                  删除
                </el-link>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <div class="pagination-wrap">
          <pagination
            v-show="total>0"
            :total="total"
            :page.sync="query.pageNo"
            :limit.sync="query.pageSize"
            @pagination="getStaff"
          />
        </div>
      </div>
    </el-card>
  </page>
</template>

<script>
import { staffList } from '@/api/staff'
import Page from '@/components/Page'
import Badge from '@/components/Badge'
import Pagination from '@/components/Pagination'

export default {
  name: 'ComplexTable',
  components: {
    Page,
    Badge,
    Pagination
  },
  data () {
    return {
      tableId: 0,
      tableLoading: false,
      total: 0,
      staffList: [],
      query: {
        key: '',
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
    searchStaff () {
      this.query.pageNo = 1
      this.getStaff()
    },
    addStaff () {
    },
    editStaff (row) {
      console.log(row)
    },
    deleteStaff (row) {
      console.log(row)
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
</style>
