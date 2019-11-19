<template>
  <x-page>
    <el-card
      shadow="never"
      class="margin-bottom-2x"
    >
      <template v-slot:header>
        <div class="fix">
          <strong class="el-card__header-title">字符串</strong>
        </div>
      </template>
      <el-form
        ref="strForm"
        :model="strForm"
        :rules="rules"
        :label-width="formLabelWidth"
        status-icon
      >
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
                  <el-input v-model.trim="strForm.strRequire"></el-input>
                </el-form-item>
              </el-col>
              <el-col :md="12">
                <el-form-item
                  label="长度"
                  prop="strLength"
                >
                  <el-input v-model.trim="strForm.strLength"></el-input>
                </el-form-item>
              </el-col>
              <el-col :md="12">
                <el-form-item
                  label="数字"
                  prop="number"
                >
                  <el-input v-model.trim="strForm.number"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </el-col>
          <el-col
            :md="24"
            class="text-center"
          >
            <el-button
              type="primary"
              @click="submitForm('strForm')"
            >提交
            </el-button>
            <el-button @click="resetForm('strForm')">重置</el-button>
          </el-col>
        </el-row>
      </el-form>
    </el-card>
    <el-card
      shadow="never"
      class="margin-bottom-2x"
    >
      <template v-slot:header>
        <div class="fix">
          <strong class="el-card__header-title">整数</strong>
        </div>
      </template>
      <template v-slot:default>
        <el-form
          ref="integerForm"
          :model="integerForm"
          :rules="rules"
          :label-width="formLabelWidth"
          status-icon
        >
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
                    <el-input v-model.trim="integerForm.integer"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :md="12">
                  <el-form-item
                    label="必填"
                    prop="integerRequire"
                  >
                    <el-input v-model.trim="integerForm.integerRequire"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :md="12">
                  <el-form-item
                    label="小于"
                    prop="integerLt"
                  >
                    <el-input v-model.trim="integerForm.integerLt"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :md="12">
                  <el-form-item
                    label="小于(包含)"
                    prop="integerLtI"
                  >
                    <el-input v-model.trim="integerForm.integerLtI"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :md="12">
                  <el-form-item
                    label="大于"
                    prop="integerGt"
                  >
                    <el-input v-model.trim="integerForm.integerGt"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :md="12">
                  <el-form-item
                    label="大于(包含)"
                    prop="integerGtI"
                  >
                    <el-input v-model.trim="integerForm.integerGtI"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :md="12">
                  <el-form-item
                    label="大小"
                    prop="integerRange"
                  >
                    <el-input v-model.trim="integerForm.integerRange"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :md="12">
                  <el-form-item
                    label="大小(包含)"
                    prop="integerRangeI"
                  >
                    <el-input v-model.trim="integerForm.integerRangeI"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-col>
            <el-col
              :md="24"
              class="text-center"
            >
              <el-button
                type="primary"
                @click="submitForm('integerForm')"
              >提交
              </el-button>
              <el-button @click="resetForm('integerForm')">重置</el-button>
            </el-col>
          </el-row>
        </el-form>
      </template>
    </el-card>
    <el-card
      shadow="never"
      class="margin-bottom-2x"
    >
      <template v-slot:header>
        <div class="fix">
          <strong class="el-card__header-title">浮点数</strong>
        </div>
      </template>
      <template v-slot:default>
        <el-form
          ref="floatForm"
          :model="floatForm"
          :rules="rules"
          :label-width="formLabelWidth"
          status-icon
        >
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
                    <el-input v-model.trim="floatForm.float"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :md="12">
                  <el-form-item
                    label="必填"
                    prop="floatRequire"
                  >
                    <el-input v-model.trim="floatForm.floatRequire"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :md="12">
                  <el-form-item
                    label="小于"
                    prop="floatLt"
                  >
                    <el-input v-model.trim="floatForm.floatLt"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :md="12">
                  <el-form-item
                    label="小于(包含)"
                    prop="floatLtI"
                  >
                    <el-input v-model.trim="floatForm.floatLtI"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :md="12">
                  <el-form-item
                    label="大于"
                    prop="floatGt"
                  >
                    <el-input v-model.trim="floatForm.floatGt"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :md="12">
                  <el-form-item
                    label="大于(包含)"
                    prop="floatGtI"
                  >
                    <el-input v-model.trim="floatForm.floatGtI"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :md="12">
                  <el-form-item
                    label="大小"
                    prop="floatRange"
                  >
                    <el-input v-model.trim="floatForm.floatRange"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :md="12">
                  <el-form-item
                    label="大小(包含)"
                    prop="floatRangeI"
                  >
                    <el-input v-model.trim="floatForm.floatRangeI"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-col>
            <el-col
              :md="24"
              class="text-center"
            >
              <el-button
                type="primary"
                @click="submitForm('floatForm')"
              >提交
              </el-button>
              <el-button @click="resetForm('floatForm')">重置</el-button>
            </el-col>
          </el-row>
        </el-form>
      </template>
    </el-card>
    <el-card
      shadow="never"
      class="margin-bottom-2x"
    >
      <template v-slot:header>
        <div class="fix">
          <strong class="el-card__header-title">常用类型</strong>
        </div>
      </template>
      <template v-slot:default>
        <el-form
          ref="usualForm"
          :model="usualForm"
          :rules="rules"
          :label-width="formLabelWidth"
          status-icon
        >
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
                    <el-input v-model.trim="usualForm.username"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :md="12">
                  <el-form-item
                    label="密码(弱)"
                    prop="passwordL"
                  >
                    <el-input
                      v-model.trim="usualForm.passwordL"
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
                      v-model.trim="usualForm.passwordM"
                      type="password"
                    ></el-input>
                  </el-form-item>
                </el-col>
                <el-col :md="12">
                  <el-form-item
                    label="密码(强)"
                    prop="passwordH"
                  >
                    <el-input
                      v-model.trim="usualForm.passwordH"
                      type="password"
                    ></el-input>
                  </el-form-item>
                </el-col>
                <el-col :md="12">
                  <el-form-item
                    label="身份证"
                    prop="idCard"
                  >
                    <el-input v-model.trim="usualForm.idCard"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :md="12">
                  <el-form-item
                    label="手机"
                    prop="mobileNo"
                  >
                    <el-input v-model.trim="usualForm.mobileNo"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :md="12">
                  <el-form-item
                    label="座机/传真"
                    prop="telNo"
                  >
                    <el-input v-model.trim="usualForm.telNo"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :md="12">
                  <el-form-item
                    label="联系方式"
                    prop="contactNo"
                  >
                    <el-input v-model.trim="usualForm.contactNo"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :md="12">
                  <el-form-item
                    label="邮箱"
                    prop="email"
                  >
                    <el-input v-model.trim="usualForm.email"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :md="12">
                  <el-form-item
                    label="网址"
                    prop="url"
                  >
                    <el-input v-model.trim="usualForm.url"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :md="12">
                  <el-form-item
                    label="QQ"
                    prop="qqNo"
                  >
                    <el-input v-model.trim="usualForm.qqNo"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :md="12">
                  <el-form-item
                    label="微信"
                    prop="wxNo"
                  >
                    <el-input v-model.trim="usualForm.wxNo"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :md="12">
                  <el-form-item
                    label="车牌号"
                    prop="carNo"
                  >
                    <el-input v-model.trim="usualForm.carNo"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-col>
            <el-col
              :md="24"
              class="text-center"
            >
              <el-button
                type="primary"
                @click="submitForm('usualForm')"
              >提交
              </el-button>
              <el-button @click="resetForm('usualForm')">重置</el-button>
            </el-col>
          </el-row>
        </el-form>
      </template>
    </el-card>
    <el-card
      shadow="never"
      class="margin-bottom-2x"
    >
      <template v-slot:header>
        <div class="fix">
          <strong class="el-card__header-title">表单控件</strong>
        </div>
      </template>
      <template v-slot:default>
        <el-form
          ref="elForm"
          :model="elForm"
          :rules="rules"
          :label-width="formLabelWidth"
          status-icon
        >
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
                      v-model="elForm.radio"
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
                      v-model="elForm.checkbox"
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
                      v-model="elForm.select"
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
                      v-model.trim="elForm.date"
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
                      v-model="elForm.time"
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
                      v-model="elForm.describe"
                      type="textarea"
                    ></el-input>
                  </el-form-item>
                </el-col>
                <el-col :md="24">
                  <el-form-item
                    label="内容"
                    prop="editor"
                  >
                    <tinymce
                      ref="editor"
                      v-model="elForm.editor"
                      @contentChange="editorChange"
                    >
                    </tinymce>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-col>
            <el-col
              :md="24"
              class="text-center"
            >
              <el-button
                type="primary"
                @click="submitForm('elForm')"
              >提交
              </el-button>
              <el-button @click="resetForm('elForm')">重置</el-button>
            </el-col>
          </el-row>
        </el-form>
      </template>
    </el-card>
    <el-card
      shadow="never"
      class="margin-bottom-2x"
    >
      <template v-slot:header>
        <div class="fix">
          <strong class="el-card__header-title">相等</strong>
        </div>
      </template>
      <template v-slot:default>
        <el-form
          ref="eqForm"
          :model="eqForm"
          :rules="rules"
          :label-width="formLabelWidth"
          status-icon
        >
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
                      v-model.trim="eqForm.password"
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
                      v-model.trim="eqForm.rePassword"
                      type="password"
                    ></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-col>
            <el-col
              :md="24"
              class="text-center"
            >
              <el-button
                type="primary"
                @click="submitForm('eqForm')"
              >提交
              </el-button>
              <el-button @click="resetForm('eqForm')">重置</el-button>
            </el-col>
          </el-row>
        </el-form>
      </template>
    </el-card>
    <el-card shadow="never">
      <template v-slot:header>
        <div class="fix">
          <strong class="el-card__header-title">异步</strong>
        </div>
      </template>
      <template v-slot:default>
        <el-form
          ref="asyncForm"
          :model="asyncForm"
          :rules="rules"
          :label-width="formLabelWidth"
          status-icon
        >
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
                    <el-input v-model.trim="asyncForm.usernameAsync"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-col>
            <el-col
              :md="24"
              class="text-center"
            >
              <el-button
                type="primary"
                @click="submitForm('asyncForm')"
              >提交
              </el-button>
              <el-button @click="resetForm('asyncForm')">重置</el-button>
            </el-col>
          </el-row>
        </el-form>
      </template>
    </el-card>
  </x-page>
</template>

<script>
import { debounce } from 'lodash'
import { regionData } from 'element-china-area-data'
import { EMI_SEX, EMI_NATION } from '@/common/emi/standard'
import validator from '@/common/utils/validate'
import * as api from '@/api/validate'
import FormSelect from '@/components/Form/Select'
import FormCheckbox from '@/components/Form/Checkbox'
import FormRadio from '@/components/Form/Radio'
import Tinymce from '@/components/Tinymce'

const VALID_USERNAME_DELAY = 300

export default {
  name: 'ValidateForm',
  components: {
    FormSelect,
    FormCheckbox,
    FormRadio,
    Tinymce
  },
  data () {
    return {
      formLabelWidth: '90px',
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
      /* 字符串 */
      strForm: {
        strRequire: '',
        strLength: '',
        number: ''
      },
      /* 整数 */
      integerForm: {
        integer: null,
        integerRequire: null,
        integerLt: null,
        integerLtI: null,
        integerGt: null,
        integerGtI: null,
        integerRange: null,
        integerRangeI: null
      },
      /* 浮点数 */
      floatForm: {
        float: null,
        floatRequire: null,
        floatLt: null,
        floatLtI: null,
        floatGt: null,
        floatGtI: null,
        floatRange: null,
        floatRangeI: null
      },
      /* 常用类型 */
      usualForm: {
        username: '',
        passwordL: '',
        passwordM: '',
        passwordH: '',
        idCard: '',
        mobileNo: '',
        telNo: '',
        contactNo: '',
        email: '',
        url: '',
        qqNo: '',
        wxNo: '',
        carNo: ''
      },
      /* 表单控件 */
      elForm: {
        radio: '',
        checkbox: [],
        select: '',
        region: '',
        date: '',
        time: '',
        describe: '',
        editor: ''
      },
      /* 相等 */
      eqForm: {
        password: '',
        rePassword: ''
      },
      /* 异步 */
      asyncForm: {
        usernameAsync: ''
      },
      rules: {
        /* 字符串 */
        strRequire: validator({ type: 'length', required: true, min: 3, max: 5 }),
        strLength: validator({ type: 'length', min: 3, max: 5 }),
        number: validator({ type: 'number' }),
        /* 整数 */
        integer: validator({ type: 'integer' }),
        integerRequire: validator({ type: 'integer', required: true }),
        integerLt: validator({ type: 'integer', max: 10, include: false }),
        integerLtI: validator({ type: 'integer', max: 10 }),
        integerGt: validator({ type: 'integer', min: 10, include: false }),
        integerGtI: validator({ type: 'integer', min: 10 }),
        integerRange: validator({ type: 'integer', min: 0, max: 10, include: false }),
        integerRangeI: validator({ type: 'integer', min: 0, max: 10 }),
        /* 浮点数 */
        float: validator({ type: 'float' }),
        floatRequire: validator({ type: 'float', required: true }),
        floatLt: validator({ type: 'float', max: 10, include: false }),
        floatLtI: validator({ type: 'float', max: 10 }),
        floatGt: validator({ type: 'float', min: 10, include: false }),
        floatGtI: validator({ type: 'float', min: 10 }),
        floatRange: validator({ type: 'float', min: 0, max: 10, include: false }),
        floatRangeI: validator({ type: 'integer', min: 0, max: 10 }),
        /* 常用类型 */
        username: validator({ type: 'username' }, '用户名'),
        passwordL: validator({ type: 'password', required: true }, '密码'),
        passwordM: validator({ type: 'password', level: 'M' }, '密码'),
        passwordH: validator({ type: 'password', level: 'H' }, '密码'),
        idCard: validator({ type: 'id' }, '身份证'),
        mobileNo: validator({ type: 'mobile' }, '手机'),
        telNo: validator({ type: 'tel' }, '座机/传真'),
        contactNo: validator({ type: 'contact' }, '联系方式'),
        email: validator({ type: 'email' }, '邮箱'),
        url: validator({ type: 'url' }, '网址'),
        qqNo: validator({ type: 'qq' }, 'QQ号'),
        wxNo: validator({ type: 'wechat' }, '微信号'),
        carNo: validator({ type: 'car' }, '车牌号'),
        /* 表单控件 */
        radio: validator({ required: true, message: '请选择性别' }),
        checkbox: validator({ required: true, type: 'array', message: '请至少选择一个兴趣爱好' }),
        select: validator({ required: true, message: '请选择民族' }),
        region: validator({ required: true, message: '请选择籍贯' }),
        date: validator({ required: true, type: 'date', message: '请选择日期' }),
        time: validator({ required: true, type: 'date', message: '请选择时间' }),
        describe: validator({ required: true, message: '请填写描述' }),
        editor: validator({ required: true, message: '请填写内容' }),
        /* 相等 */
        password: validator({ type: 'password', required: true }, '密码'),
        rePassword: [
          ...validator({ type: 'password', required: true }, '重复密码'),
          { validator: this.validatePassEquate, trigger: 'change' }
        ],
        /* 异步 */
        usernameAsync: [
          ...validator({ type: 'username', required: true }, '用户名'),
          { validator: this.validUsernameAsync, trigger: 'change' }
        ]
      }
    }
  },
  watch: {
    'region.selected' (value) {
      this.elForm.region = value.length ? value.join(' ') : ''
      this.$refs['elForm'].validateField('region')
    },
    'eqForm.password' () {
      if (this.eqForm.rePassword) {
        this.$refs['eqForm'].validateField('rePassword')
      }
    }
  },
  methods: {
    /* 编辑器内容改变事件 */
    editorChange () {
      this.$refs['elForm'].validateField('editor')
    },
    /* 表单提交 */
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
    /* 重置表单 */
    resetForm (formName) {
      this.$refs[formName].resetFields()
    },
    /* 验证是否相等 */
    validatePassEquate (rule, value, callback) {
      value === this.eqForm.password ? callback() : callback(new Error('两次输入密码不一致!'))
    },
    /* 用户名异步验证 注意：element-ui 验证组件中的validator函数暂不支持async await语法*/
    validUsernameAsync: debounce(function (rule, value, callback) {
      if (!value) {
        return
      }
      api.validUsername(value).then(() => {
        return callback()
      }).catch(err => {
        return callback(err)
      })
    }, VALID_USERNAME_DELAY)
  }
}
</script>

