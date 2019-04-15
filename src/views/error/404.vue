<template>
  <div class="page-404">
    <div class="wrapper">
      <div class="pic">
        <img class="pic-bg"
             src="@/assets/images/404.png"
             alt="404">
        <img class="pic-cloud cloud-left"
             src="@/assets/images/404_cloud.png"
             alt="404">
        <img class="pic-cloud cloud-middle"
             src="@/assets/images/404_cloud.png"
             alt="404">
        <img class="pic-cloud cloud-right"
             src="@/assets/images/404_cloud.png"
             alt="404">
      </div>
      <div class="tips">
        <div class="tips-oops">OOPS!</div>
        <div class="tips-message">{{ message }}</div>
        <div class="tips-info">请检查输入的网址是否正确，请点击以下按钮返回主页或者联系管理员</div>
        <router-link to="/"
                     class="tips-return-home">返回首页</router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Page404',
  data () {
    return {
      message: '抱歉，该页面不存在或没有访问权限'
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.page-404 {
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
      position: relative;
      width: 500px;
      overflow: hidden;
      &-bg {
        width: 100%;
      }
      &-cloud {
        position: absolute;
        animation-duration: 2s;
        animation-timing-function: linear;
        animation-fill-mode: forwards;
        &.cloud-left {
          width: 80px;
          top: 17px;
          left: 220px;
          opacity: 0;
          animation-name: cloudLeft;
          animation-delay: 1s;
        }
        &.cloud-middle {
          width: 46px;
          top: 10px;
          left: 420px;
          opacity: 0;
          animation-name: cloudMiddle;
          animation-delay: 1.2s;
        }
        &.cloud-right {
          width: 62px;
          top: 100px;
          left: 500px;
          opacity: 0;
          animation-name: cloudRight;
          animation-delay: 1s;
        }
        @keyframes cloudLeft {
          0% {
            top: 17px;
            left: 220px;
            opacity: 0;
          }
          20% {
            top: 33px;
            left: 188px;
            opacity: 1;
          }
          80% {
            top: 81px;
            left: 92px;
            opacity: 1;
          }
          100% {
            top: 97px;
            left: 60px;
            opacity: 0;
          }
        }
        @keyframes cloudMiddle {
          0% {
            top: 10px;
            left: 420px;
            opacity: 0;
          }
          20% {
            top: 40px;
            left: 360px;
            opacity: 1;
          }
          70% {
            top: 130px;
            left: 180px;
            opacity: 1;
          }
          100% {
            top: 160px;
            left: 120px;
            opacity: 0;
          }
        }
        @keyframes cloudRight {
          0% {
            top: 100px;
            left: 500px;
            opacity: 0;
          }
          20% {
            top: 120px;
            left: 460px;
            opacity: 1;
          }
          80% {
            top: 180px;
            left: 340px;
            opacity: 1;
          }
          100% {
            top: 200px;
            left: 300px;
            opacity: 0;
          }
        }
      }
    }
    .tips {
      width: 300px;
      padding: 30px 0;
      overflow: hidden;
      &-oops {
        font-size: 32px;
        font-weight: bold;
        line-height: 40px;
        color: #1482f0;
        opacity: 0;
        margin-bottom: 20px;
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
        background: #1482f0;
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
  .page-404 .wrapper .pic {
    display: none;
  }
}
</style>
