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
              type="default"
              icon="el-icon-refresh"
              @click="resetSearch"
            >
              重置
            </el-button>
          </span>
          <span class="filter-item">
            <el-button
              type="primary"
              icon="iconfont icon-plus"
              @click="addStaff"
            >
              新增
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
                <span>{{ (query.page - 1) * query.limit + 1 + scope.$index }}</span>
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
                <badge :status="scope.row.state === '1'? 'success' : 'danger'">
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
                  @click.stop="editStaff(row)"
                >
                  编辑
                </el-link>
                &nbsp;
                <el-popover
                  :ref="row.staffId"
                  placement="top"
                  width="220"
                >
                  <p>确定删除员工“<strong class="text-danger">{{ row.staffName }}</strong>”吗？</p>
                  <div class="text-right">
                    <el-button
                      size="mini"
                      type="text"
                      @click.stop="closePopover(row.staffId)"
                    >取消
                    </el-button>
                    <el-button
                      type="primary"
                      size="mini"
                      @click.stop="deleteStaff(row.staffId)"
                    >确定
                    </el-button>
                  </div>
                  <el-link
                    slot="reference"
                    type="primary"
                  >
                    删除
                  </el-link>
                </el-popover>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <div class="pagination-wrap">
          <pagination
            v-show="total>0"
            :total="total"
            :page.sync="query.page"
            :limit.sync="query.limit"
            @pagination="getStaff"
          />
        </div>
      </div>
    </el-card>
  </page>
</template>

<script>
import * as api from '@/api/staff'
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
        page: 1,
        limit: 10,
        sort: {}
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
        const data = await api.staffList(this.query)
        this.staffList = data.data || []
        this.total = data.total || 0
      } catch (e) {
        this.$message({
          showClose: true,
          type: 'error',
          message: e.message
        })
      } finally {
        this.$nextTick(() => {
          this.tableLoading = false
        })
      }
    },
    addStaff () {
    },
    deleteStaff: async function (staffId) {
      const loading = this.$loading({
        lock: true,
        text: '正在删除',
        spinner: 'fa fa-spinner fa-spin fa-2x',
        background: 'rgba(255, 255, 255, 0.5)'
      })
      try {
        await api.deleteStaff(staffId)
        this.$message({
          showClose: true,
          type: 'success',
          message: '删除成功'
        })
        this.searchStaff(this.query.page)
      } catch (e) {
        this.$message({
          showClose: true,
          type: 'error',
          message: e.message
        })
      } finally {
        this.closePopover(staffId)
        this.$nextTick(() => {
          loading.close()
        })
      }
    },
    editStaff (row) {
      console.log(row)
    },
    searchStaff (pageNo) {
      this.query.page = Number.isInteger(pageNo) ? pageNo : 1
      this.getStaff()
    },
    resetSearch () {
      this.query.key = ''
      this.query.sex = ''
      this.query.state = ''
      this.searchStaff()
    },
    closePopover (id) {
      this.$refs[id].doClose()
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
</style>
