<template>
  <div ref="input" class="multi-search-input" @click.stop>
    <comp-input
      ref="comp_input"
      v-popover:popover=""
      :value="searchContent"
      @click.native="handleInputFocus"
      @input="handleInputInput"
      :placeholder="!isShowCount && placeholder"
      :clearable="clearable && showClearIcon"
    >
      <div v-if="!showClearIcon" class="suffix-icon-wrapper" slot="suffix">
        <i class="el-icon-arrow-down"/>
      </div>
      <div class="count-tag" v-if="isShowCount" slot="prefix">
        <i>{{selectedOptions.length}}</i>
        <span>{{placeholder}}</span>
      </div>
    </comp-input>
    <div class="multi-search-input__tags" v-if="selectedOptions.length > 0 && showTags">
      <comp-tag
        class="multi-search-input__tag__item"
        v-for="(option, index) in selectedOptions"
        closable=""
        :key="index"
        @close="handleTagClose(option)"
      >
        {{getLabelByValue(option)}}
      </comp-tag>
    </div>
    <comp-popover
      :key="searchContent"
      :value="isPopoverShow"
      popper-class="multi-search-input__popover"
      width="200"
      trigger="manual"
      placement="bottom"
    >
      <comp-checkbox
        v-if="showAll"
        :value="checkAll"
        key="all"
        class="all-checkbox"
        :indeterminate="isIndeterminate"
        :label="allOptionLabel"
        :title="allOptionLabel"
        @change="handleCheckAllChange">
        {{allOptionLabel}}
      </comp-checkbox>
      <comp-checkbox-group :value="selectedOptions" @input="handleCheckboxGroupInput">
        <comp-checkbox
          v-for="(option, index) in filteredOptions"
          :key="index"
          :label="option.value"
          :title="option.label"
        >
          {{option.label}}
        </comp-checkbox>
      </comp-checkbox-group>
      <div class="multi-search-input__popover__footer" v-if="searchContent.length === 0">
        <span>请输入文字以进一步筛选</span>
      </div>
      <div
        class="multi-search-input__popover__null"
        v-if="searchContent.length !== 0 && filteredOptions.length === 0"
      >
        <span>未搜索到相关信息</span>
      </div>
    </comp-popover>
  </div>
</template>

<script>
  import { get, isEmpty, isString, concat } from 'lodash-es'
  import { Input, Popover, CheckboxGroup, Checkbox, Tag } from 'element-ui'

  export default {
    name: 'ShMultiSearchInput',
    components: {
      CompInput: Input,
      CompPopover: Popover,
      CompCheckboxGroup: CheckboxGroup,
      CompCheckbox: Checkbox,
      CompTag: Tag,
    },
    props: {
      value: {
        type: Object,
        default: () => ({}),
      },
      options: {
        type: Array,
        default: () => ([]),
        required: true,
      },
      extOptions: {
        type: Array,
        default: () => ([]),
        required: false,
      },
      showTags: {
        type: Boolean,
        default: true,
      },
      showAll: {
        type: Boolean,
        default: false,
      },
      allOptionLabel: {
        type: String,
        default: '全部',
      },
      placeholder: String,
      clearable: Boolean,
    },
    data () {
      return {
        isActivePopover: false,
        isIndeterminate: false,
      }
    },
    mounted () {
      document.body.addEventListener('click', this.handleBodyClick)
    },
    beforeDestroy () {
      document.body.removeEventListener('click', this.handleBodyClick)
    },
    computed: {
      showClearIcon () {
        return this.searchContent && this.isActivePopover
      },
      isPopoverShow () {
        return this.isActivePopover && !!this.allOptions.length
      },
      searchContent () {
        return this.isShowCount ? '' : get(this.value, 'searchContent', '')
      },
      isShowCount () {
        return !this.showTags && !this.isActivePopover && this.selectedOptions.length > 0
      },
      formattedOptions () {
        return this.options.map(option => isString(option) ? { label: option, value: option } : option)
      },
      formattedExtOptions () {
        return this.extOptions.map(option => isString(option) ? { label: option, value: option } : option)
      },
      mergedOptions () {
        return concat(this.formattedOptions, this.formattedExtOptions)
      },
      allOptions () {
        // 输入框中没有值的时候, 仅显示 options.
        // 输入框中有值的时候, 需要在 options 和 extOptions 的合集中搜索
        if (isEmpty(this.searchContent)) {
          return this.formattedOptions
        }
        return this.mergedOptions
      },
      // 根据searchContent筛选后的options
      filteredOptions () {
        if (isEmpty(this.searchContent)) {
          return this.allOptions
        }
        return this.allOptions.filter(option => option.label.toLowerCase().includes(this.searchContent.toLowerCase()))
      },
      // 默认选中列表
      selectedOptions () {
        return get(this.value, 'selectedOptions', [])
      },
      checkAll () {
        return this.options.length === this.selectedOptions.length
      },
    },
    methods: {
      getLabelByValue (value) {
        return this.mergedOptions.find(option => option.value === value).label
      },
      handleInputFocus () {
        this.isActivePopover = true
        this.$refs.comp_input.focus()
      },
      handleInputInput (searchContent) {
        this.$emit('searchInputChange', {
          ...this.value,
          searchContent: searchContent,
        })
      },
      handleCheckboxGroupInput (selectedOptions) {
        const checkedCount = selectedOptions.length
        this.isIndeterminate = checkedCount > 0 && checkedCount < this.options.length
        this.$emit('change', {
          ...this.value,
          selectedOptions,
        })
      },
      handleBodyClick (event) {
        if (!this.$refs.input.contains(event.target)) {
          this.isActivePopover = false
        }
      },
      handleCheckAllChange (value) {
        this.$emit('change', {
          ...this.value,
          selectedOptions: value ? this.options.map(option => option.value) : [],
        })
        this.isIndeterminate = false
      },
      handleTagClose (tag) {
        this.selectedOptions.splice(this.selectedOptions.indexOf(tag), 1)
      },
    },
  }
</script>

<style lang="scss">
  @import '../../styles/variable';
  @import '../../styles/mixin';

  .multi-search-input {
    position: relative;
    display: inline-block;

    .suffix-icon-wrapper {
      width: 20px;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .count-tag {
      @include text-normal;
      height: 100%;
      display: flex;
      align-items: center;

      i {
        display: flex;
        width: 24px;
        height: 24px;
        background-color: rgba(255, 213, 0, .3);
        border-radius: 50%;
        align-items: center;
        justify-content: center;
        margin-right: 8px;
        font-style: normal;
      }
    }

    .multi-search-input__tags {
      border-radius: 2px;
      border: 1px solid #dcdfe6;
      margin-top: 8px;
      max-height: 85px;
      overflow: scroll;
      padding: 6px 8px 0 8px;

      .el-tag {
        margin-bottom: 6px;
        margin-right: 6px;
      }
    }

    &__popover {
      box-sizing: border-box;
      max-height: 230px;
      overflow-y: auto;

      &[x-placement^=bottom] {
        margin-top: 6px;
      }
      &[x-placement^=top] {
        margin-bottom: 6px;
      }

      .all-checkbox {
        margin-bottom: 8px;
      }

      .el-checkbox-group {
        .el-checkbox {
          display: flex;
          align-items: center;
          margin-left: 0;

          &__label {
            max-width: 100%;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }

          & + .el-checkbox {
            margin-top: 8px;
          }
        }
      }

      &__null {
        text-align: center;
      }

      &__footer {
        margin-top: 10px;
        font-size: 0.8rem;
        color: $color-tip;
        cursor: default;
      }
    }
  }
</style>
