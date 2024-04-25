<template>
  <comp-auto-complete
    class="sh-single-search-input"
    :value="value"
    @input="handleInput"
    @select="handleSelect"
    @blur="handleBlur"
    :fetch-suggestions="handleSearch"
    :placeholder="placeholder"
  >
    <i
      class="el-input__icon el-icon-circle-close el-input__clear"
      v-show="showClearIcon"
      slot="suffix"
      @click="handleClear"
    ></i>
    <span slot-scope="slot" :title="slot.item.label">{{ slot.item.label }}</span>
  </comp-auto-complete>
</template>

<script>
  import { isEmpty, isString, concat } from 'lodash-es'
  import { Autocomplete } from 'element-ui'

  export default {
    name: 'ShSingleSearchInput',
    components: {
      CompAutoComplete: Autocomplete,
    },
    props: {
      value: {
        type: String,
        default: '',
      },
      options: {
        type: Array,
        default: () => ([]),
      },
      extOptions: {
        type: Array,
        default: () => ([]),
      },
      placeholder: String,
      clearable: Boolean,
    },
    computed: {
      showClearIcon () {
        return this.clearable && this.value.length > 0
      },
      formattedOptions () {
        return this.options.map(option => isString(option) ? { value: option, label: option } : option)
      },
      formattedExtOptions () {
        return this.extOptions.map(option => isString(option) ? { value: option, label: option } : option)
      },
      selectOptions () {
        // 输入框中没有值的时候, 仅显示 options.
        // 输入框中有值的时候, 需要在 options 和 extOptions 的合集中搜索
        if (isEmpty(this.value)) {
          return this.formattedOptions
        } else {
          return this.allOptions
        }
      },
      allOptions () {
        return concat(this.formattedOptions, this.formattedExtOptions)
      },
      isIllegalValue () {
        return this.value && !this.allOptions.find(option => option.label.toLowerCase() === this.value.toLowerCase())
      },
    },
    methods: {
      handleInput (value) {
        this.$emit('searchInputChange', value)
      },
      handleSelect (option) {
        this.$emit('change', option.value)
        this.$emit('select', option)
      },
      handleBlur () {
        if (this.isIllegalValue) {
          this.$emit('searchInputChange', '')
        }
      },
      handleClear () {
        this.$emit('change', '')
      },
      handleSearch (content, cb) {
        cb(this.filterOptions(content || ''))
      },
      filterOptions (content) {
        return this.selectOptions.filter(option => option.value.toLowerCase().includes(content.toLowerCase()))
      },
    },
  }
</script>

<style lang="scss">
  @import '../../styles/variable';
  @import '../../styles/mixin';

  .sh-single-search-input {
    .el-input__clear {
      display: none;
    }

    &:hover {
     .el-input__clear {
        display: initial;
      }
    }
  }
</style>
