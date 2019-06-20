<template>
  <page>
    <el-card shadow="never">
      <div class="x-table-page">
        <div class="x-table-page-filter">
          <span class="filter-item">
            <el-input
              v-model.trim="query.key"
              clearable
              maxlength="20"
              placeholder="姓名/工号/身份证号"
              @clear="queryStaff(1)"
            />
          </span>
          <span class="filter-item">
            <el-select
              v-model="query.sex"
              placeholder="性别"
              clearable
              style="width: 90px;"
              @change="queryStaff(1)"
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
              @change="queryStaff(1)"
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
              @click="queryStaff(1)"
            >
              查询
            </el-button>
          </span>
          <span class="filter-item">
            <el-button
              type="default"
              icon="el-icon-refresh"
              @click="resetQuery"
            >
              重置
            </el-button>
          </span>
          <span class="filter-item">
            <el-button
              type="primary"
              :disabled="!selectedList || !selectedList.length"
              @click="batchDeleteStaff"
            >
              批量删除
            </el-button>
          </span>
        </div>
        <div class="x-table-page-info">
          <el-alert
            type="primary"
            show-icon
            :closable="false"
            class="tips"
          >
            <template v-slot:title>
              <span>您已选择</span>
              <span class="primary">{{ selectedList.length }}</span>
              <span>项</span>&nbsp;&nbsp;&nbsp;&nbsp;
              <a
                href="javascript:void(0)"
                @click="clearSelectedList"
              >清除选中</a>
            </template>
          </el-alert>
        </div>
        <div class="x-table-page-table">
          <el-table
            ref="staffTable"
            v-loading="tableLoading"
            :row-key="getRowKeys"
            style="width: 100%"
            :data="staffList"
            stripe
            fit
            highlight-current-row
            @selection-change="selectionChangeHandler"
          >
            <el-table-column
              :reserve-selection="true"
              type="selection"
              width="50"
              fixed
            >
            </el-table-column>
            <el-table-column
              label="#"
              width="50"
              fixed
            >
              <template v-slot:default="scope">
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
              width="180"
            >
            </el-table-column>
            <el-table-column
              label="性别"
              width="50"
              align="center"
            >
              <template v-slot:default="scope">
                <span>{{ scope.row.sex === '1' ? '男' : '女' }}</span>
              </template>
            </el-table-column>
            <el-table-column
              prop="native"
              label="籍贯"
            >
            </el-table-column>
            <el-table-column
              prop="phone"
              label="手机"
              width="120"
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
              <template v-slot:default="scope">
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
              <template v-slot:default="{row}">&nbsp;
                <el-popover
                  :ref="row.staffId"
                  placement="top"
                  width="220"
                >
                  <template v-slot:default>
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
                        @click.stop="deleteStaff(row)"
                      >确定
                      </el-button>
                    </div>
                  </template>
                  <el-link
                    slot="reference"
                    type="primary"
                  >删除</el-link>
                </el-popover>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <div class="x-table-page-pagination">
          <pagination
            v-show="total>0"
            :total="total"
            :page.sync="query.page"
            :limit.sync="query.limit"
            @pagination="queryStaff"
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
      getRowKeys (row) {
        return row.staffId
      },
      tableLoading: false,
      total: 0,
      staffList: [],
      selectedList: [],
      query: {
        key: '',
        sex: '',
        state: '',
        page: 1,
        limit: 10
      }
    }
  },
  created () {
    const { params } = this.$route
    if (params) {
      Object.assign(this.query, params)
    }
    this.queryStaff()
  },
  methods: {
    deleteStaff: async function (row) {
      const loading = this.$loading({
        text: '正在删除',
        spinner: 'fa fa-spinner fa-spin fa-2x',
        background: 'rgba(255, 255, 255, 0.5)'
      })
      try {
        await api.deleteStaff(row.staffId)
        this.$message({
          showClose: true,
          type: 'success',
          message: '删除成功'
        })
        this.$refs.staffTable.toggleRowSelection(row, false)
        this.queryStaff(this.query.page)
      } catch (e) {
        this.$message({
          showClose: true,
          type: 'error',
          message: e.message
        })
      } finally {
        this.closePopover(row.staffId)
        this.$nextTick(() => {
          loading.close()
        })
      }
    },
    batchDeleteStaff () {
      const _this = this
      if (!_this.selectedList || !_this.selectedList.length) {
        _this.$message({
          showClose: true,
          type: 'error',
          message: '请先选择员工'
        })
        return
      }
      _this.$confirm(`此操作将删除${_this.selectedList.length}位员工的信息, 是否继续?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async function () {
        const loading = _this.$loading({
          text: '正在删除',
          spinner: 'fa fa-spinner fa-spin fa-2x',
          background: 'rgba(255, 255, 255, 0.5)'
        })
        try {
          await api.batchDeleteStaff(_this.selectedList)
          _this.$message({
            showClose: true,
            type: 'success',
            message: '删除成功'
          })
          _this.clearSelectedList()
          _this.queryStaff(_this.query.page)
        } catch (e) {
          _this.$message({
            showClose: true,
            type: 'error',
            message: e.message
          })
        } finally {
          _this.$nextTick(() => {
            loading.close()
          })
        }
      })
    },
    queryStaff: async function (pageNo) {
      if (Number.isInteger(pageNo)) {
        this.query.page = pageNo
      }
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
    resetQuery () {
      this.query.key = ''
      this.query.sex = ''
      this.query.state = ''
      this.queryStaff(1)
    },
    closePopover (id) {
      this.$refs[id].doClose()
    },
    clearSelectedList () {
      this.$refs.staffTable.clearSelection()
    },
    selectionChangeHandler (selected) {
      this.selectedList = []
      if (selected.length > 0) {
        for (const selection of selected) {
          this.selectedList.push(selection.staffId)
        }
      }
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
</style>
