<template>
  <div class="page-error">
    <div class="wrapper">
      <div class="pic">
        <img src="@/assets/images/error.png"
             width="100%">
      </div>
      <div class="tips">
        <h1 class="tips-oops">Oops!</h1>
        <div class="tips-message">抱歉，您没有权限访问该功能</div>
        <div class="tips-info">请联系管理员为您添加该功能的访问权限</div>
        <router-link to="/"
                     class="tips-return-home">返回首页</router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Page401',
  methods: {
    back () {
      this.$router.go(-1)
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.page-error {
  transform: translate(-50%, -50%);
  position: absolute;
  top: 50%;
  left: 50%;
  width: 100%;
  height: auto;
  .wrapper {
    position: relative;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    padding: 0 50px;
    .pic {
      width: 500px;
      padding-top: 20px;
      margin-right: 30px;
      img {
        width: 100%;
      }
    }
    .tips {
      width: 300px;
      &-oops {
        font-size: 60px;
        font-weight: 700;
        color: #484848;
        margin-top: 0;
        line-height: 60px;
        animation-name: slideUp;
        animation-duration: 0.5s;
        animation-fill-mode: forwards;
      }
      &-message {
        font-size: 20px;
        line-height: 24px;
        color: #222;
        font-weight: bold;
        opacity: 0;
        margin-bottom: 10px;
        animation-name: slideUp;
        animation-duration: 0.5s;
        animation-delay: 0.1s;
        animation-fill-mode: forwards;
      }
      &-info {
        font-size: 14px;
        line-height: 22px;
        color: grey;
        opacity: 0;
        margin-bottom: 30px;
        animation-name: slideUp;
        animation-duration: 0.5s;
        animation-delay: 0.2s;
        animation-fill-mode: forwards;
      }
      &-return-home {
        display: block;
        float: left;
        width: 110px;
        height: 36px;
        background: #008489;
        border-radius: 100px;
        text-align: center;
        color: #ffffff;
        opacity: 0;
        font-size: 14px;
        line-height: 36px;
        text-decoration: none;
        cursor: pointer;
        animation-name: slideUp;
        animation-duration: 0.5s;
        animation-delay: 0.3s;
        animation-fill-mode: forwards;
      }
      @keyframes slideUp {
        0% {
          transform: translateY(60px);
          opacity: 0;
        }
        100% {
          transform: translateY(0);
          opacity: 1;
        }
      }
    }
  }
}

@media screen and (max-width: 767px) {
  .page-error .wrapper .pic {
    display: none;
  }
}
</style>
