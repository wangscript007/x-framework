<template>
  <el-radio-group v-model="checked">
    <template v-for="(item, index) in items">
      <el-radio
        v-if="valueKeyInItems && labelKeyInItems"
        :key="item[valueKeyInItems]"
        :label="item[valueKeyInItems]"
      >
        {{ item[labelKeyInItems] }}
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
      type: Array,
      default: () => []
    },
    valueKeyInItems: {
      type: String,
      default: null
    },
    labelKeyInItems: {
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
