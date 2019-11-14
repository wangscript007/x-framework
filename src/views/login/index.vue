<template>
  <div class="login-page">
    <div
      :style="{backgroundImage:`url(${app.loginPic})`}"
      class="img-wrap animated fadeInLeft"
    ></div>
    <div class="content-wrap">
      <el-row>
        <el-col
          :xl="{span:17, offset: 7}"
          :lg="{span:18, offset: 6}"
          :md="{span:19, offset: 5}"
          :sm="{span:20, offset: 4}"
          :xs="24"
        >
          <div class="login-form-header animated fadeIn">
            <div
              :style="{backgroundImage:`url(${app.logo})`}"
              class="header-logo"
            ></div>
            <div class="header-title">{{ app.name }}</div>
          </div>
        </el-col>
        <el-col
          :xl="{span:10, offset: 7}"
          :lg="{span:12, offset: 6}"
          :md="{span:14, offset: 5}"
          :sm="{span:16, offset: 4}"
          :xs="{span:18, offset: 3}"
        >
          <div class="login-form">
            <el-form
              ref="loginForm"
              :model="form"
              :rules="rules"
              class="login-form"
              auto-complete="on"
              label-position="left"
            >
              <el-form-item prop="username">
                <el-input
                  v-model.trim="form.username"
                  size="large"
                  prefix-icon="iconfont icon-user"
                  :placeholder="'用户名'"
                  name="username"
                  type="text"
                  auto-complete="on"
                />
              </el-form-item>
              <el-form-item prop="password">
                <el-input
                  v-model.trim="form.password"
                  size="large"
                  prefix-icon="iconfont icon-key"
                  :type="passwordType"
                  :placeholder="'密码'"
                  name="password"
                  auto-complete="on"
                  @keyup.enter.native="loginHandler"
                >
                  <template v-slot:suffix>
                    <i
                      :title="showPassword ? '隐藏密码': '显示密码'"
                      :class="showPassword ? 'fa fa-eye': 'fa fa-eye-slash'"
                      class="show-pwd-icon"
                      @click="showPassword = !showPassword"
                    ></i>
                  </template>
                </el-input>
              </el-form-item>
              <el-row class="form-op">
                <el-col
                  :span="12"
                  class="remember-me"
                >
                </el-col>
                <el-col
                  :span="12"
                  class="text-right find-pwd"
                >
                  <a href="javascript:void(0)">忘记密码</a>
                </el-col>
              </el-row>
              <el-button
                size="large"
                :loading="loading"
                type="primary"
                style="width:100%;margin-bottom:30px;"
                @click.native.prevent="loginHandler"
              >
                登录
              </el-button>
            </el-form>
          </div>
          <div class="third-login text-center">
            <div class="third-party-title"><span>第三方登录</span></div>
            <a
              class="third-party-item weixin"
              href="javascript:void(0)"
              title="微信登录"
            ></a>
            <a
              class="third-party-item qq"
              href="javascript:void(0)"
              title="QQ登录"
            ></a>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import awaitTo from 'await-to-js'
import { mapGetters } from 'vuex'
import validator from '@/common/utils/validate'

export default {
  name: 'Login',
  data () {
    return {
      form: {
        username: 'admin',
        password: '123456'
      },
      rules: {
        username: validator({ type: 'username', required: true, min: 4, max: 30 }, '用户名'),
        password: validator({ type: 'password', required: true, min: 5, max: 30 }, '密码')
      },
      showPassword: false,
      loading: false,
      redirect: null,
      remember: false
    }
  },
  computed: {
    ...mapGetters(['app']),
    passwordType () {
      return this.showPassword ? 'text' : 'password'
    }
  },
  watch: {
    $route: {
      handler: function (route) {
        const { redirect } = route.query
        this.redirect = redirect
      },
      immediate: true
    }
  },
  methods: {
    loginHandler () {
      this.$refs.loginForm.validate(async (valid) => {
        if (!valid) {
          return false
        }
        this.loading = true
        const [err] = await awaitTo(this.$store.dispatch('login', this.form))
        this.loading = false
        if (err) {
          this.$message.error({ showClose: true, type: 'error', message: err.message })
          return
        }
        const redirect = this.redirect ? decodeURIComponent(this.redirect) : '/'
        this.$router.push({ path: redirect })
      })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss">
  @import '~@/assets/scss/login.scss';
</style>
