<template>
  <page>
    <el-card shadow="never">
      <el-form
        ref="ruleForm"
        :model="form"
        :rules="rules"
        label-width="auto"
        status-icon
      >
        <field-set>
          <template v-slot:title>
            <h4 class="margin-top-0x margin-bottom-0x">字符串</h4>
          </template>
          <template v-slot:default>
            <el-row>
              <el-col
                :xl="{span: 18, offset:3}"
                :lg="{span: 20, offset: 2}"
                :md="{span: 22, offset: 1}"
                :sm="{span: 24}"
              >
                <el-row :gutter="24">
                  <el-col :md="12">
                    <el-form-item
                      label="必填"
                      prop="strRequire"
                    >
                      <el-input v-model.trim="form.strRequire"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :md="12">
                    <el-form-item
                      label="字符长度"
                      prop="strLength"
                    >
                      <el-input v-model.trim="form.strLength"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :md="12">
                    <el-form-item
                      label="数字字符"
                      prop="number"
                    >
                      <el-input v-model.trim="form.number"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
              </el-col>
            </el-row>
          </template>
        </field-set>
        <field-set>
          <template v-slot:title>
            <h4 class="margin-top-0x margin-bottom-0x">整数</h4>
          </template>
          <template v-slot:default>
            <el-row>
              <el-col
                :xl="{span: 18, offset:3}"
                :lg="{span: 20, offset: 2}"
                :md="{span: 22, offset: 1}"
                :sm="{span: 24}"
              >
                <el-row :gutter="24">
                  <el-col :md="12">
                    <el-form-item
                      label="整数"
                      prop="integer"
                    >
                      <el-input v-model.trim="form.integer"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :md="12">
                    <el-form-item
                      label="整数(必填)"
                      prop="integerRequire"
                    >
                      <el-input v-model.trim="form.integerRequire"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :md="12">
                    <el-form-item
                      label="小于"
                      prop="integerLt"
                    >
                      <el-input v-model.trim="form.integerLt"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :md="12">
                    <el-form-item
                      label="小于(包含)"
                      prop="integerLtI"
                    >
                      <el-input v-model.trim="form.integerLtI"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :md="12">
                    <el-form-item
                      label="大于"
                      prop="integerGt"
                    >
                      <el-input v-model.trim="form.integerGt"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :md="12">
                    <el-form-item
                      label="大于(包含)"
                      prop="integerGtI"
                    >
                      <el-input v-model.trim="form.integerGtI"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :md="12">
                    <el-form-item
                      label="大小"
                      prop="integerRange"
                    >
                      <el-input v-model.trim="form.integerRange"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :md="12">
                    <el-form-item
                      label="大小(包含)"
                      prop="integerRangeI"
                    >
                      <el-input v-model.trim="form.integerRangeI"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
              </el-col>
            </el-row>
          </template>
        </field-set>
        <field-set>
          <template v-slot:title>
            <h4 class="margin-top-0x margin-bottom-0x">浮点数</h4>
          </template>
          <template v-slot:default>
            <el-row>
              <el-col
                :xl="{span: 18, offset:3}"
                :lg="{span: 20, offset: 2}"
                :md="{span: 22, offset: 1}"
                :sm="{span: 24}"
              >
                <el-row :gutter="24">
                  <el-col :md="12">
                    <el-form-item
                      label="浮点数"
                      prop="float"
                    >
                      <el-input v-model.trim="form.float"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :md="12">
                    <el-form-item
                      label="浮点数(必填)"
                      prop="floatRequire"
                    >
                      <el-input v-model.trim="form.floatRequire"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :md="12">
                    <el-form-item
                      label="小于"
                      prop="floatLt"
                    >
                      <el-input v-model.trim="form.floatLt"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :md="12">
                    <el-form-item
                      label="小于(包含)"
                      prop="floatLtI"
                    >
                      <el-input v-model.trim="form.floatLtI"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :md="12">
                    <el-form-item
                      label="大于"
                      prop="floatGt"
                    >
                      <el-input v-model.trim="form.floatGt"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :md="12">
                    <el-form-item
                      label="大于(包含)"
                      prop="floatGtI"
                    >
                      <el-input v-model.trim="form.floatGtI"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :md="12">
                    <el-form-item
                      label="大小"
                      prop="floatRange"
                    >
                      <el-input v-model.trim="form.floatRange"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :md="12">
                    <el-form-item
                      label="大小(包含)"
                      prop="floatRangeI"
                    >
                      <el-input v-model.trim="form.floatRangeI"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
              </el-col>
            </el-row>
          </template>
        </field-set>
        <field-set>
          <template v-slot:title>
            <h4 class="margin-top-0x margin-bottom-0x">常用类型</h4>
          </template>
          <template v-slot:default>
            <el-row>
              <el-col
                :xl="{span: 18, offset:3}"
                :lg="{span: 20, offset: 2}"
                :md="{span: 22, offset: 1}"
                :sm="{span: 24}"
              >
                <el-row :gutter="24">
                  <el-col :md="12">
                    <el-form-item
                      label="用户名"
                      prop="username"
                    >
                      <el-input v-model.trim="form.username"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :md="12">
                    <el-form-item
                      label="密码(弱)"
                      prop="passwordW"
                    >
                      <el-input
                        v-model.trim="form.passwordW"
                        type="password"
                      ></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :md="12">
                    <el-form-item
                      label="密码(中)"
                      prop="passwordM"
                    >
                      <el-input
                        v-model.trim="form.passwordM"
                        type="password"
                      ></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :md="12">
                    <el-form-item
                      label="密码(强)"
                      prop="passwordS"
                    >
                      <el-input
                        v-model.trim="form.passwordS"
                        type="password"
                      ></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :md="12">
                    <el-form-item
                      label="身份证"
                      prop="idCard"
                    >
                      <el-input v-model.trim="form.idCard"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :md="12">
                    <el-form-item
                      label="手机"
                      prop="mobileNo"
                    >
                      <el-input v-model.trim="form.mobileNo"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :md="12">
                    <el-form-item
                      label="座机/传真"
                      prop="telNo"
                    >
                      <el-input v-model.trim="form.telNo"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :md="12">
                    <el-form-item
                      label="联系方式"
                      prop="contactNo"
                    >
                      <el-input v-model.trim="form.contactNo"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :md="12">
                    <el-form-item
                      label="邮箱"
                      prop="email"
                    >
                      <el-input v-model.trim="form.email"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :md="12">
                    <el-form-item
                      label="网址"
                      prop="url"
                    >
                      <el-input v-model.trim="form.url"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :md="12">
                    <el-form-item
                      label="QQ"
                      prop="qqNo"
                    >
                      <el-input v-model.trim="form.qqNo"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :md="12">
                    <el-form-item
                      label="微信"
                      prop="wxNo"
                    >
                      <el-input v-model.trim="form.wxNo"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :md="12">
                    <el-form-item
                      label="车牌号"
                      prop="carNo"
                    >
                      <el-input v-model.trim="form.carNo"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
              </el-col>
            </el-row>
          </template>
        </field-set>
        <field-set>
          <template v-slot:title>
            <h4 class="margin-top-0x margin-bottom-0x">表单控件</h4>
          </template>
          <template v-slot:default>
            <el-row>
              <el-col
                :xl="{span: 18, offset:3}"
                :lg="{span: 20, offset: 2}"
                :md="{span: 22, offset: 1}"
                :sm="{span: 24}"
              >
                <el-row :gutter="24">
                  <el-col :md="12">
                    <el-form-item
                      label="性别"
                      prop="radio"
                    >
                      <form-radio
                        v-model="form.radio"
                        :items="sex"
                        value-key="id"
                        label-key="name"
                      ></form-radio>
                    </el-form-item>
                  </el-col>
                  <el-col :md="24">
                    <el-form-item
                      label="兴趣爱好"
                      prop="checkbox"
                    >
                      <form-checkbox
                        v-model="form.checkbox"
                        :items="hobby"
                      ></form-checkbox>
                    </el-form-item>
                  </el-col>
                  <el-col :md="12">
                    <el-form-item
                      label="民族"
                      prop="select"
                    >
                      <form-select
                        v-model="form.select"
                        :items="nation"
                        value-key="id"
                        label-key="name"
                        :filterable="true"
                        :clearable="true"
                        class="full-width"
                      ></form-select>
                    </el-form-item>
                  </el-col>
                  <el-col :md="12">
                    <el-form-item
                      label="籍贯"
                      prop="region"
                    >
                      <el-cascader
                        v-model="region.selected"
                        :options="region.options"
                        :props="region.props"
                        :clearable="true"
                        separator=" "
                        class="full-width"
                      >
                      </el-cascader>
                    </el-form-item>
                  </el-col>
                  <el-col :md="12">
                    <el-form-item
                      label="日期"
                      prop="date"
                    >
                      <el-date-picker
                        v-model.trim="form.date"
                        type="date"
                        class="full-width"
                        placeholder="选择日期"
                      ></el-date-picker>
                    </el-form-item>
                  </el-col>
                  <el-col :md="12">
                    <el-form-item
                      label="时间"
                      prop="time"
                    >
                      <el-time-picker
                        v-model="form.time"
                        placeholder="选择时间"
                        class="full-width"
                      ></el-time-picker>
                    </el-form-item>
                  </el-col>
                  <el-col :md="24">
                    <el-form-item
                      label="描述"
                      prop="describe"
                    >
                      <el-input
                        v-model="form.describe"
                        type="textarea"
                      ></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
              </el-col>
            </el-row>
          </template>
        </field-set>
        <field-set>
          <template v-slot:title>
            <h4 class="margin-top-0x margin-bottom-0x">是否相等</h4>
          </template>
          <template v-slot:default>
            <el-row>
              <el-col
                :xl="{span: 18, offset:3}"
                :lg="{span: 20, offset: 2}"
                :md="{span: 22, offset: 1}"
                :sm="{span: 24}"
              >
                <el-row :gutter="24">
                  <el-col :md="12">
                    <el-form-item
                      label="密码"
                      prop="password"
                    >
                      <el-input
                        v-model.trim="form.password"
                        type="password"
                      ></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :md="12">
                    <el-form-item
                      label="重复密码"
                      prop="rePassword"
                    >
                      <el-input
                        v-model.trim="form.rePassword"
                        type="password"
                      ></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
              </el-col>
            </el-row>
          </template>
        </field-set>
        <field-set>
          <template v-slot:title>
            <h4 class="margin-top-0x margin-bottom-0x">异步校验</h4>
          </template>
          <template v-slot:default>
            <el-row>
              <el-col
                :xl="{span: 18, offset:3}"
                :lg="{span: 20, offset: 2}"
                :md="{span: 22, offset: 1}"
                :sm="{span: 24}"
              >
                <el-row :gutter="24">
                  <el-col :md="12">
                    <el-form-item
                      label="用户名"
                      prop="usernameAsync"
                    >
                      <el-input v-model.trim="form.usernameAsync"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
              </el-col>
            </el-row>
          </template>
        </field-set>
        <el-form-item>
          <el-button
            type="primary"
            @click="submitForm('ruleForm')"
          >提交
          </el-button>
          <el-button
            @click="resetForm('ruleForm')"
          >重置
          </el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </page>
</template>

<script>
import request from '@/common/utils/request'
import { debounce } from 'lodash'
import { regionData } from 'element-china-area-data'
import { EMI_SEX, EMI_NATION } from '@/common/emi/standard'
import validator from '@/common/utils/validate'
import Page from '@/components/Page'
import FieldSet from '@/components/FieldSet'
import FormSelect from '@/components/Form/Select'
import FormCheckbox from '@/components/Form/Checkbox'
import FormRadio from '@/components/Form/Radio'

const VALID_USERNAME_DELAY = 300

export default {
  name: 'ValidateForm',
  components: {
    Page,
    FieldSet,
    FormSelect,
    FormCheckbox,
    FormRadio
  },
  data () {
    return {
      sex: EMI_SEX,
      hobby: ['美食', '运动', '旅游', '政治', '军事', '汽车', '科技', '摄影'],
      nation: EMI_NATION,
      region: {
        options: regionData,
        props: {
          value: 'label'
        },
        select: []
      },
      form: {
        /* 字符串 */
        strRequire: '',
        strLength: '',
        number: '',
        /* 整数 */
        integer: null,
        integerRequire: null,
        integerLt: null,
        integerLtI: null,
        integerGt: null,
        integerGtI: null,
        integerRange: null,
        integerRangeI: null,
        /* 浮点数 */
        float: null,
        floatRequire: null,
        floatLt: null,
        floatLtI: null,
        floatGt: null,
        floatGtI: null,
        floatRange: null,
        floatRangeI: null,
        /* 常用类型 */
        username: '',
        passwordW: '',
        passwordM: '',
        passwordS: '',
        idCard: '',
        mobileNo: '',
        telNo: '',
        contactNo: '',
        email: '',
        url: '',
        qqNo: '',
        wxNo: '',
        carNo: '',
        /* 表单控件 */
        radio: '',
        checkbox: [],
        select: '',
        region: '',
        date: '',
        time: '',
        describe: '',
        /* 相等 */
        password: '',
        rePassword: '',
        /* 异步 */
        usernameAsync: ''
      },
      rules: {
        /* 字符串 */
        strRequire: { required: true, message: '该项为必填', trigger: 'change' },
        strLength: { required: true, min: 3, max: 5, message: '该项必填为，长度 3 到 5 个字符', trigger: 'change' },
        number: { validator: validator('isNumber'), trigger: 'change' },
        /* 整数 */
        integer: { validator: validator('isInteger'), trigger: 'change' },
        integerRequire: { validator: validator('isInteger', null, { require: true }), trigger: 'change' },
        integerLt: { validator: validator('isInteger', null, { max: 10, include: false }), trigger: 'change' },
        integerLtI: { validator: validator('isInteger', null, { max: 10 }), trigger: 'change' },
        integerGt: { validator: validator('isInteger', null, { min: 10, include: false }), trigger: 'change' },
        integerGtI: { validator: validator('isInteger', null, { min: 10 }), trigger: 'change' },
        integerRange: {
          validator: validator('isInteger', null, { min: 0, max: 10, include: false }),
          trigger: 'change'
        },
        integerRangeI: { validator: validator('isInteger', null, { min: 0, max: 10 }), trigger: 'change' },
        /* 浮点数 */
        float: { validator: validator('isFloat'), trigger: 'change' },
        floatRequire: { validator: validator('isFloat', null, { require: true }), trigger: 'change' },
        floatLt: { validator: validator('isFloat', null, { max: 10, include: false }), trigger: 'change' },
        floatLtI: { validator: validator('isFloat', null, { max: 10 }), trigger: 'change' },
        floatGt: { validator: validator('isFloat', null, { min: 10, include: false }), trigger: 'change' },
        floatGtI: { validator: validator('isFloat', null, { min: 10 }), trigger: 'change' },
        floatRange: { validator: validator('isFloat', null, { min: 0, max: 10, include: false }), trigger: 'change' },
        floatRangeI: { validator: validator('isFloat', null, { min: 0, max: 10 }), trigger: 'change' },
        /* 常用类型 */
        username: { validator: validator('username', '用户名'), trigger: 'change' },
        passwordW: { validator: validator('password', '密码'), trigger: 'change' },
        passwordM: { validator: validator('password', '密码', 'M'), trigger: 'change' },
        passwordS: { validator: validator('password', '密码', 'S'), trigger: 'change' },
        idCard: { validator: validator('idCardNo', '身份证号码'), trigger: 'change' },
        mobileNo: { validator: validator('mobileNo', '手机号码'), trigger: 'change' },
        telNo: { validator: validator('telNo', '座机/传真号码'), trigger: 'change' },
        contactNo: { validator: validator('contactNo', '联系方式'), trigger: 'change' },
        email: { validator: validator('email', '邮箱'), trigger: 'change' },
        // email: { type: 'email', message: '邮箱格式错误', trigger: 'blur' },
        url: { validator: validator('url', '网址'), trigger: 'change' },
        // url: { tyle: 'url', message: 'Url格式错误', trigger: 'change' },
        qqNo: { validator: validator('qqNo', 'QQ号码'), trigger: 'change' },
        wxNo: { validator: validator('wxNo', '微信号'), trigger: 'change' },
        carNo: { validator: validator('carNo', '车牌号'), trigger: 'change' },
        /* 表单控件 */
        radio: { required: true, message: '请选择性别', trigger: 'change' },
        checkbox: { type: 'array', required: true, message: '请至少选择一个兴趣爱好', trigger: 'change' },
        select: { required: true, message: '请选择民族', trigger: 'change' },
        region: { required: true, message: '请选择籍贯', trigger: 'blur' },
        date: { type: 'date', required: true, message: '请选择日期', trigger: 'change' },
        time: { type: 'date', required: true, message: '请选择时间', trigger: 'change' },
        describe: { required: true, message: '请填写描述', trigger: 'blur' },
        /* 相等 */
        password: { validator: validator('password', '密码'), trigger: 'change' },
        rePassword: [
          { validator: validator('password', '重复密码'), trigger: 'change' },
          { validator: this.validatePassEquate, trigger: 'change' }
        ],
        /* 异步 */
        usernameAsync: [
          { validator: validator('username', '用户名'), trigger: 'change' },
          { validator: this.validUsernameAsync, trigger: 'change' }
        ]
      }
    }
  },
  watch: {
    'region.selected' (value) {
      this.form.region = value.length ? value.join(' ') : ''
      this.$refs['ruleForm'].validateField('region')
    },
    'form.password' () {
      if (this.form.rePassword) {
        this.$refs['ruleForm'].validateField('rePassword')
      }
    }
  },
  methods: {
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert('submit!')
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
    },
    validatePassEquate (rule, value, callback) {
      value === this.form.password ? callback() : callback(new Error('两次输入密码不一致!'))
    },
    /* 注意，element-ui 验证组件中的validator函数暂不支持async await语法 */
    validUsernameAsync: debounce(function (rule, value, callback) {
      if (!value) {
        return
      }
      request({
        url: '/validate/username',
        method: 'get',
        params: {
          username: value
        }
      }).then(res => {
        const { data } = res
        if (!data) {
          return callback(new Error('校验失败，请重试'))
        }
        if (!data.success) {
          return callback(new Error(data.message || '用户名已被注册'))
        }
        return callback()
      }).catch(e => {
        return callback(new Error(e.message || '校验失败，请重试'))
      })
    }, VALID_USERNAME_DELAY)
  }
}
</script>

