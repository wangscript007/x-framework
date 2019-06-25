<template>
  <el-steps
    :active="currentStep"
    align-center
    finish-status="success"
  >
    <el-step
      v-for="(item, index) in data"
      :key="item[valueKey] || `stepKey_${index}`"
      :title="item[titleKey]"
      :description="item.description"
    >
    </el-step>
  </el-steps>
</template>

<script>
export default {
  name: 'Steps',
  model: {
    prop: 'current',
    event: 'currentChange'
  },
  props: {
    data: {
      type: Array,
      default: () => []
    },
    valueKey: {
      type: String,
      default: 'id'
    },
    titleKey: {
      type: String,
      default: 'title'
    },
    descKey: {
      type: String,
      default: 'description'
    },
    current: {
      type: Number,
      default: 0
    }
  },
  data () {
    return {
      currentStep: this.current
    }
  },
  watch: {
    current (value) {
      this.currentStep = value
    },
    currentStep (value) {
      this.$emit('currentChange', value)
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
</style>
