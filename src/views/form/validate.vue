<template>
  <page>
    <el-card shadow="never">
      <el-row>
        <el-col
          :xl="{span: 18, offset:3}"
          :lg="{span: 20, offset: 2}"
          :md="{span: 22, offset: 1}"
          :sm="{span: 24}"
        >
          <el-form
            :model="form"
            :rules="rules"
            label-width="auto"
            status-icon
          >
            <el-row :gutter="24">
              <el-col :md="12">
                <el-form-item
                  label="非空"
                  prop="strRequire"
                >
                  <el-input v-model.trim="form.strRequire"></el-input>
                </el-form-item>
              </el-col>
              <el-col :md="12">
                <el-form-item
                  label="长度限制"
                  prop="strLength"
                >
                  <el-input v-model.trim="form.strLength"></el-input>
                </el-form-item>
              </el-col>
              <el-col :md="12">
                <el-form-item
                  label="数字"
                  prop="number"
                >
                  <el-input v-model.number="form.number"></el-input>
                </el-form-item>
              </el-col>
              <el-col :md="12">
                <el-form-item
                  label="整数"
                  prop="integer"
                >
                  <el-input v-model.number="form.integer"></el-input>
                </el-form-item>
              </el-col>
              <el-col :md="12">
                <el-form-item
                  label="整数范围"
                  prop="integerRange"
                >
                  <el-input v-model.number="form.integerRange"></el-input>
                </el-form-item>
              </el-col>
              <el-col :md="12">
                <el-form-item
                  label="浮点数"
                  prop="float"
                >
                  <el-input v-model="form.float"></el-input>
                </el-form-item>
              </el-col>
              <el-col :md="12"></el-col>
              <el-col :md="12"></el-col>
              <el-col :md="12"></el-col>
              <el-col :md="12"></el-col>
              <el-col :md="12"></el-col>
              <el-col :md="12"></el-col>
              <el-col :md="12"></el-col>
              <el-col :md="12"></el-col>
              <el-col :md="12"></el-col>
            </el-row>
          </el-form>
        </el-col>
      </el-row>
    </el-card>
  </page>
</template>

<script>
import Page from '@/components/Page'

export default {
  name: 'ValidateForm',
  components: {
    Page
  },
  data () {
    return {
      form: {
        strRequire: '',
        strLength: '',
        number: null,
        integer: null,
        integerRange: null,
        float: null
      },
      rules: {
        strRequire: { required: true, message: '该项为必填', trigger: 'blur' },
        strLength: { required: true, min: 3, max: 5, message: '该项必填且长度在 3 到 5 个字符', trigger: 'blur' },
        number: { required: true, type: 'number', message: '该项必填且只能输入数字', trigger: 'blur' },
        integer: { required: true, type: 'integer', message: '该项必填且只能输入有效整数', trigger: 'blur' },
        integerRange: { required: true, min: 3, max: 10, type: 'integer', message: '该项必填且只能输入有效整数，大小在 3 到 10 之间', trigger: 'blur' },
        float: { required: true, type: 'float', message: '该项必填且只能输入有效浮点数', trigger: 'blur' }
      }
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
</style>

