<template>
  <el-row>
    <el-col :lg="{span:6,offset:9}"
            :md="{span:8,offset:8}"
            :sm="{span:12,offset:6}"
            :xs="{span:20,offset:2}">
      <el-form ref="loginForm"
               :model="form"
               :rules="rules"
               class="login-form"
               auto-complete="on"
               label-position="left">
        <el-form-item prop="username">
          <el-input v-model="form.username"
                    prefix-icon="iconfont icon-user"
                    :placeholder="'用户名'"
                    name="username"
                    type="text"
                    auto-complete="on" />
        </el-form-item>
        <el-form-item prop="password">
          <el-input v-model="form.password"
                    prefix-icon="iconfont icon-key"
                    :type="passwordType"
                    :placeholder="'密码'"
                    name="password"
                    auto-complete="on"
                    @keyup.enter.native="handleLogin">
            <el-button @click="showPassword = !showPassword"
                       slot="append"
                       :icon="showPassword? 'iconfont icon-eye-fill': 'iconfont icon-eye'"></el-button>
          </el-input>
        </el-form-item>
        <el-button :loading="loading"
                   type="primary"
                   style="width:100%;margin-bottom:30px;"
                   @click.native.prevent="loginHandler">
          登录
        </el-button>
      </el-form>
    </el-col>
  </el-row>
</template>

<script>
import validateUtil from '@/common/utils/validate'

export default {
  name: 'login',
  data () {
    return {
      form: {
        username: 'admin',
        password: '123456'
      },
      rules: {
        username: [
          {required: true, trigger: 'blur', message: '请输入用户名'},
          {min: 4, max: 30, message: '用户名长度应在4到30为之间'},
          {validator: this.usernameValidator, trigger: 'blur'}
        ],
        password: [
          {required: true, trigger: 'blur', message: '请输入密码'},
          {min: 6, max: 30, message: '密码长度应在6到30为之间'}
        ]
      },
      showPassword: false,
      loading: false,
      redirect: undefined
    }
  },
  computed: {
    passwordType () {
      return this.showPassword ? 'text' : 'password'
    }
  },
  watch: {
    $route: {
      handler: function (route) {
        this.redirect = route.query && route.query.redirect
      },
      immediate: true
    }
  },
  methods: {
    usernameValidator (rule, value, callback) {
      const validateRes = validateUtil.username(value)
      if (!validateRes.valid) {
        callback(validateRes.error)
      } else {
        callback()
      }
    },
    loginHandler () {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true
          this.$store.dispatch('login', this.form).then(() => {
            this.loading = false
            this.$router.push({ path: this.redirect || '/' })
          }).catch(() => {
            this.loading = false
          })
        } else {
          return false
        }
      })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>

</style>
