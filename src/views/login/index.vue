<template>
  <div class="login-page">
    <div :style="{backgroundImage:`url(${webside.loginBg})`}"
         class="img-wrap animated fadeInLeft"></div>
    <div class="content-wrap">
      <el-row>
        <el-col :xl="{span:17, offset: 7}"
                :lg="{span:18, offset: 6}"
                :md="{span:19, offset: 5}"
                :sm="{span:20, offset: 4}"
                :xs="24">
          <div class="login-form-header animated fadeIn">
            <div :style="{backgroundImage:`url(${webside.logo})`}"
                 class="header-logo"></div>
            <div class="header-title">{{webside.title}}</div>
          </div>
        </el-col>
        <el-col :xl="{span:10, offset: 7}"
                :lg="{span:12, offset: 6}"
                :md="{span:14, offset: 5}"
                :sm="{span:16, offset: 4}"
                :xs="{span:18, offset: 3}">
          <div class="login-form">
            <el-form ref="loginForm"
                     :model="form"
                     :rules="rules"
                     class="login-form"
                     auto-complete="on"
                     label-position="left">
              <el-form-item prop="username">
                <el-input v-model.trim="form.username"
                          size="large"
                          prefix-icon="iconfont icon-user"
                          :placeholder="'用户名'"
                          name="username"
                          type="text"
                          auto-complete="on" />
              </el-form-item>
              <el-form-item prop="password">
                <el-input v-model.trim="form.password"
                          size="large"
                          prefix-icon="iconfont icon-key"
                          :type="passwordType"
                          :placeholder="'密码'"
                          name="password"
                          auto-complete="on"
                          @keyup.enter.native="handleLogin">
                  <i slot="suffix"
                     :title="showPassword ? '隐藏密码': '显示密码'"
                     :class="showPassword ? 'fa fa-eye': 'fa fa-eye-slash'"
                     @click="showPassword = !showPassword"
                     class="show-pwd-icon"></i>
                </el-input>
              </el-form-item>
              <el-row class="form-op">
                <el-col :span="12"
                        class="remember-me">
                  <el-checkbox v-model="remember">记住帐号</el-checkbox>
                </el-col>
                <el-col :span="12"
                        class="text-right find-pwd">
                  <a href="javascript:void(0)">忘记密码</a>
                </el-col>
              </el-row>
              <el-button size="large"
                         :loading="loading"
                         type="primary"
                         style="width:100%;margin-bottom:30px;"
                         @click.native.prevent="loginHandler">
                登录
              </el-button>
            </el-form>
          </div>
          <div class="third-login text-center">
            <div class="third-party-title"><span>第三方登录</span></div>
            <a class="third-party-item weixin"
               href="javascript:void(0)"
               title="微信登录"></a>
            <a class="third-party-item qq"
               href="javascript:void(0)"
               title="QQ登录"></a>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
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
          { required: true, trigger: 'blur', message: '请输入用户名' },
          { min: 4, max: 30, message: '用户名长度应在4到30为之间' },
          { validator: this.usernameValidator, trigger: 'blur' }
        ],
        password: [
          { required: true, trigger: 'blur', message: '请输入密码' },
          { min: 6, max: 30, message: '密码长度应在6到30为之间' }
        ]
      },
      showPassword: false,
      loading: false,
      redirect: null,
      remember: false
    }
  },
  computed: {
    ...mapGetters(['webside']),
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
      !validateRes.valid ? callback(validateRes.error) : callback()
    },
    loginHandler () {
      this.$refs.loginForm.validate(async (valid) => {
        if (valid) {
          try {
            this.loading = true
            await this.$store.dispatch('login', this.form)
            this.$router.push({ path: this.redirect || '/' })
          } catch (err) {
            this.$message.error(err.message)
          } finally {
            this.loading = false
          }
        } else {
          return false
        }
      })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss">
@import "@/assets/scss/login.scss";
</style>
