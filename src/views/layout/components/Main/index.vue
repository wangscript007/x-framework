<template>
  <div class="x-layout-main">
    <transition name="toggle-page"
                mode="out-in">
      <router-view />
    </transition>
  </div>
</template>

<script>
export default {
  name: 'LayoutMain'
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.toggle-page-leave-active,
.toggle-page-enter-active {
  transition: all 0.5s;
}

.toggle-page-enter {
  opacity: 0;
  transform: translateX(-30px);
}

.toggle-page-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
</style>
