<template>
  <comp-auto-complete
    ref="autocomplete"
    class="sh-auto-complete"
    :value="value"
    :valueKey="valueKey"
    @input="handleInput"
    @select="handleSelect"
    @focus="rotateArrow"
    @blur="rotateArrow"
    @clear="handleClear"
    :fetch-suggestions="handleSearch"
    :placeholder="placeholder"
    :disabled="disabled"
    :isMove="isMove"
    v-loadMore="{ loadMore, needLoadMore }"
  >
    <i
      class="el-input__icon el-icon-circle-close el-input__clear"
      v-show="showClearIcon"
      slot="suffix"
      @click="handleClear"
    >
    </i>
    <i
      :class="[{'rotate': isArrowRotated }, 'el-select__caret el-input__icon el-icon-arrow-down']"
      v-show="showArrowIcon && !showClearIcon"
      slot="suffix"
      @click="toggleOptions"
    >
    </i>
    <span slot-scope="slot" :title="slot.item.label">{{ slot.item.label }}</span>
  </comp-auto-complete>
</template>

<script>
  import { isString, throttle } from 'lodash-es'
  import { Autocomplete } from 'element-ui'
  import { infiniteScroll } from '@/share/utils/help'

  export default {
    name: 'ShAutoComplete',
    components: {
      CompAutoComplete: Autocomplete,
    },
    props: {
      value: String,
      placeholder: String,
      clearable: Boolean,
      isMove: Boolean,
      disabled: {
        type: Boolean,
        default: false,
      },
      options: {
        type: Array,
        default: () => ([]),
      },
      valueKey: {
        type: String,
        default: 'value',
      },
      showArrowIcon: {
        type: Boolean,
        default: false,
      },
      needLoadMore: {
        type: Boolean,
        default: false,
      },
    },
    data () {
      return {
        isArrowRotated: false,
      }
    },
    directives: {
      loadMore: {
        inserted (el, binding) {
          const { loadMore, needLoadMore } = binding.value
          if (needLoadMore) {
            const wrapDom = el.querySelector('.el-autocomplete-suggestion__wrap')
            const scroll = throttle(
              infiniteScroll.bind(null, wrapDom, 10, loadMore),
              1000,
            )
            wrapDom.addEventListener('scroll', scroll)
          }
        },
      },
    },
    watch: {
      options (newVal) {
        // 实时更新el-autocomplete data中的 suggestions（下拉列表）
        this.$refs.autocomplete.suggestions = newVal
      },
      isMove (newVal) {
        newVal && this.$refs.autocomplete.close()
      },
    },
    computed: {
      showClearIcon () {
        return this.clearable && this.value.length > 0
      },
      formattedOptions () {
        return this.options.map(option => isString(option) ? { value: option, label: option } : option)
      },
    },
    methods: {
      handleInput (value) {
        this.$emit('input', value)
        this.$emit('searchInputChange', value)
      },
      handleSelect (option) {
        this.$emit('change', option.value)
        this.$emit('select', option)
      },
      handleClear () {
        this.$emit('input', '')
        this.$emit('change', '')
        this.$emit('clear')
      },
      handleSearch (content, cb) {
        cb(this.filterOptions(content || ''))
        this.$emit('onQueryChange', content)
      },
      filterOptions (content) {
        return this.formattedOptions.filter(option => option[this.valueKey].toLowerCase().includes(content.toLowerCase()))
      },
      rotateArrow () {
        this.isArrowRotated = !this.isArrowRotated
      },
      toggleOptions () {
        // 点击icon控制el-autocomplete data中的activated，收起/展开下拉列表
        this.$refs.autocomplete.activated ? this.$refs.autocomplete.close() : this.$refs.autocomplete.focus()
      },
      loadMore () {
        this.$emit('loadMore')
      },
    },
  }
</script>

<style lang="scss">
  @import '../../styles/variable';
  @import '../../styles/mixin';

  .sh-auto-complete {
    .el-input__clear {
      display: none;
    }

    &:hover {
     .el-input__clear {
        display: initial;
      }
    }
  }
  .rotate {
    transform: rotate(180deg);
    transform-origin: center;
  }
  .el-icon-arrow-down {
    cursor: pointer;
  }
</style>
