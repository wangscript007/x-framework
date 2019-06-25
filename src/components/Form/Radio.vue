<template>
  <el-radio-group v-model="checked">
    <template v-for="(item, index) in items">
      <el-radio
        v-if="valueKey && labelKey"
        :key="item[valueKey]"
        :label="item[valueKey]"
      >
        {{ item[labelKey] }}
      </el-radio>
      <el-radio
        v-else
        :key="index"
        :label="item"
      >
      </el-radio>
    </template>
  </el-radio-group>
</template>

<script>
export default {
  name: 'Radio',
  model: {
    prop: 'radioValue',
    event: 'checkedChange'
  },
  props: {
    items: {
      type: Array,
      default: () => []
    },
    radioValue: {
      type: String,
      default: ''
    },
    valueKey: {
      type: String,
      default: null
    },
    labelKey: {
      type: String,
      default: null
    }
  },
  data () {
    return {
      checked: this.radioValue
    }
  },
  watch: {
    radioValue (value) {
      this.checked = value
    },
    checked (value) {
      this.$emit('checkedChange', value)
    }
  }
}
</script>
