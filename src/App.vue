<template>
  <div id="app">
    <transition
      name="animate-app"
      type="out-in"
    >
      <router-view key="app" />
    </transition>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>
