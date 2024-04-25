<template>
  <div class="sh-select-search">
    <el-select
      class="sh-select"
      :value="value.selectedOption"
      :multiple="selectMultiple"
      :disabled="selectDisabled"
      :clearable="selectClearable"
      :placeholder="selectPlaceholder"
      @change="selectChange"
      ref="select">
      <el-option
        v-for="item in options"
        :key="item.value"
        :label="item.label"
        :value="item.value">
      </el-option>
    </el-select>
    <el-input
      class="sh-search"
      :value="value.searchValue"
      :disabled="searchDisabled"
      :clearable="searchClearable"
      :placeholder="searchPlaceholder"
      @input="inputChange"
    >
    </el-input>
  </div>
</template>

<script>
  import { Select, Option, Input } from 'element-ui'

  export default {
    name: 'ShSelectSearch',
    components: {
      ElSelect: Select,
      ElOption: Option,
      ElInput: Input,
    },
    props: {
      value: {
        type: Object,
        required: true,
      },
      options: {
        type: Array,
        default: () => ([]),
      },
      selectMultiple: { // 下拉框是否多选，默认false，非必传。
        type: Boolean,
        default: false,
      },
      selectDisabled: { // 下拉框是否禁用，默认false，非必传。
        type: Boolean,
        default: false,
      },
      selectClearable: { // 下拉框是否可清空选项，默认true，非必传。
        type: Boolean,
        default: false,
      },
      selectPlaceholder: { // 下拉框提示文字，默认‘请选择’，非必传。
        type: String,
        default: '请选择',
      },
      searchPlaceholder: { // 搜索框提示文字，默认‘按关键字搜索’，非必传。
        type: String,
        default: '按关键字搜索',
      },
      searchDisabled: { // 搜索框是否禁用，默认false，非必传。
        type: Boolean,
        default: false,
      },
      searchClearable: { // 搜索框是否可清空选项，默认true，非必传。
        type: Boolean,
        default: true,
      },
    },
    methods: {
      selectChange (v) {
        const obj = {
          ...this.value,
          selectedOption: v,
          searchValue: undefined,
        }
        this.$emit('selectedChange', obj)
      },
      inputChange (v) {
        const obj = {
          ...this.value,
          searchValue: v || undefined,
        }
        this.$emit('change', obj)
      },
    },
  }
</script>

<style lang="scss" scoped>
@import '../../styles/variable';

.sh-select-search {
  display: flex;
  align-items: center;

  .sh-select {
    width: 42%;
    margin-right: -4px;

    :global(div.el-input .el-input__inner) {
      color: $color-shell-yellow;
    }
  }

  .sh-search {
    width: calc(60% + 4px);
  }
}
</style>
