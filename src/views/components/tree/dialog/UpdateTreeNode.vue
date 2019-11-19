<template>
  <el-dialog
    custom-class="dialog-responsive-xs"
    :title="`${isEdit ? '编辑' : '新增'}部门`"
    :visible.sync="opened"
    :append-to-body="true"
    :before-close="closeHandler"
    @opened="openedHandler"
  >
    <template v-slot:default>
      <el-form
        ref="deptForm"
        :model="deptForm"
        :rules="rules"
        label-width="auto"
        status-icon
      >
        <el-row>
          <el-col :md="24">
            <el-form-item
              label="部门名称"
              prop="deptName"
              class="margin-bottom-0x"
            >
              <el-input v-model.trim="deptForm.deptName"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </template>
    <template v-slot:footer>
      <el-button
        @click="closeHandler"
      >取 消
      </el-button>
      <el-button
        type="primary"
        @click="submitHandler"
      >确 定
      </el-button>
    </template>
  </el-dialog>
</template>

<script>
import { randomString } from '@/common/utils'
import validator from '@/common/utils/validate'

export default {
  name: 'UpdateTreeNode',
  props: {
    opened: {
      type: Boolean,
      default: false
    },
    data: {
      type: Object,
      default: null
    },
    isEdit: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      deptForm: {
        deptName: ''
      },
      rules: {
        deptName: validator({ required: true }, '部门名称')
      }
    }
  },
  methods: {
    /* dialog打开完成时，作一些数据预处理操作 */
    openedHandler () {
      if (this.isEdit) {
        this.deptForm.deptName = this.data.deptName
        this.$nextTick(() => {
          this.$refs['deptForm'].clearValidate()
        })
      }
    },
    /* 关闭dialog */
    closeHandler () {
      this.$refs['deptForm'].resetFields()
      this.$emit('closeHandler')
    },
    /* 提交事件 */
    submitHandler () {
      this.$refs['deptForm'].validate((valid) => {
        if (!valid) {
          return false
        }

        /* **************************** */
        /* 异步处理数据 */
        /* **************************** */

        /* 异步处理成功后返回数据 */
        this.$emit('updateHandler', {
          deptId: this.isEdit ? this.data.deptId : randomString(),
          deptName: this.deptForm.deptName
        }, this.data)
        /* 触发关闭事件 */
        this.closeHandler()
      })
    }
  }
}
</script>
