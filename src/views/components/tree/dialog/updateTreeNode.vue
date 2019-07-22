<template>
  <el-dialog
    :title="`${isEdit ? '编辑' : '新增'}部门`"
    :visible.sync="opened"
    custom-class="dialog-responsive-xs"
    width="30%"
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
            >
              <el-input v-model.trim="deptForm.deptName"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </template>
    <template v-slot:footer>
      <el-button
        @click="cancelHandler"
      >取 消</el-button>
      <el-button
        type="primary"
        @click="submitHandler"
      >确 定</el-button>
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
  created () {
    this.isEdit = !!this.data
  },
  methods: {
    cancelHandler () {
      this.$emit('dialogCancel')
    },
    submitHandler () {
      this.$refs['deptForm'].validate((valid) => {
        if (!valid) {
          return false
        }

        /* **************************** */
        /* 异步处理数据 */
        /* **************************** */

        /* 异步处理成功后返回 */
        this.$emit('dialogSubmit', {
          deptId: this.isEdit ? this.data.deptId : randomString(),
          deptName: this.deptForm.deptName
        })
      })
    }
  }
}
</script>
