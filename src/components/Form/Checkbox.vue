<template>
  <el-checkbox-group v-model="checked">
    <template v-for="(item, index) in items">
      <el-checkbox
        v-if="valueKeyInItems && labelKeyInItems"
        :key="item[valueKeyInItems]"
        :label="item[valueKeyInItems]"
      >
        {{ item[labelKeyInItems] }}
      </el-checkbox>
      <el-checkbox
        v-else
        :key="index"
        :label="item"
      >
      </el-checkbox>
    </template>
  </el-checkbox-group>
</template>

<script>
export default {
  name: 'Checkbox',
  model: {
    prop: 'checkboxValue',
    event: 'checkedChange'
  },
  props: {
    items: {
      type: Array,
      default: () => []
    },
    checkboxValue: {
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
      checked: this.checkboxValue
    }
  },
  watch: {
    checkboxValue (value) {
      this.checked = value
    },
    checked (value) {
      this.$emit('checkedChange', value)
    }
  }
}
</script>
