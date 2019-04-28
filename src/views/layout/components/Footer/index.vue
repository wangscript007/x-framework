<template>
  <footer class="x-layout-footer">
    <div class="footer-content">
      <div class="footer-links">
        <router-link
          to="/"
          title="首页"
          tag="a"
        >
          首页
        </router-link>
        <a
          href="https://github.com/xustshinn/x-framework"
          target="_blank"
          title="Github"
        >
          <x-icon
            icon="iconfont icon-github-fill"
            type="class"
          />
        </a>
        <a
          href="javascript:void(0)"
          target="_blank"
          title="X-FRAMEWORK Studio"
        >
          X-FRAMEWORK
        </a>
      </div>
      <div class="footer-copy">
        Copyright&nbsp;
        <x-icon
          icon="iconfont icon-copyright"
          type="class"
        />&nbsp;
        2019&nbsp;
        X-FRAMEWORK Studio
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'LayoutFooter'
}
</script>

<style scoped>

</style>
