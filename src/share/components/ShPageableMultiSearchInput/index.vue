<template>
  <div ref="input" class="pageable-multi-search-input">
    <comp-input
      ref="comp_input"
      :value="searchString"
      @click.native="handleSearchFocus"
      @input="handleSearchChange"
      :placeholder="!isShowCount && placeholder"
    >
      <div class="suffix-icon-wrapper" slot="suffix">
        <i class="el-icon-arrow-down"/>
      </div>
      <div class="count-tag" v-if="isShowCount" slot="prefix">
        <i>{{selectedOptions.length}}</i>
        <span>已选择</span>
      </div>
    </comp-input>
    <comp-popover
      :value="isActivePopover"
      popper-class="pageable-multi-search-input__popover"
      trigger="manual"
      placement="bottom"
      v-scrollLoad="{ loadMore }"
    >
      <div
        class="pageable-multi-search-input__popover__null"
        v-if="options.length === 0"
      >
        <span>暂无数据</span>
      </div>
      <comp-checkbox-group v-else :value="selectedOptions" @input="handleSelectChange">
        <comp-checkbox
          v-for="(option, index) in options"
          :key="index"
          :label="option.value"
          :title="option.label"
        >
          {{option.label}}
        </comp-checkbox>
      </comp-checkbox-group>
    </comp-popover>
  </div>
</template>

<script>
  import { isEmpty, throttle } from 'lodash-es'
  import { Input, Popover, CheckboxGroup, Checkbox } from 'element-ui'
  import { infiniteScroll } from '@/share/utils/help'
  export default {
    name: 'ShPageableMultiSearchInput',
    components: {
      CompInput: Input,
      CompPopover: Popover,
      CompCheckboxGroup: CheckboxGroup,
      CompCheckbox: Checkbox,
    },
    directives: {
      scrollLoad: {
        inserted (el, binding) {
          const { loadMore } = binding.value
          const wrapDom = el.querySelector('.pageable-multi-search-input__popover')
          const scroll = throttle(
            infiniteScroll.bind(null, wrapDom, 0, loadMore),
            1000,
          )
          wrapDom.addEventListener('scroll', scroll)
        },
      },
    },
    props: {
      selectedOptions: Array,
      searchContent: String,
      options: {
        type: Array,
        default: () => ([]),
        required: true,
      },
      placeholder: String,
    },
    data () {
      return {
        isActivePopover: false,
        searchValue: this.searchContent,
      }
    },
    mounted () {
      document.body.addEventListener('click', this.handleBodyClick)
    },
    beforeDestroy () {
      document.body.removeEventListener('click', this.handleBodyClick)
    },
    computed: {
      isShowCount () {
        return !this.isActivePopover && !isEmpty(this.selectedOptions)
      },
      searchString () {
        return this.isActivePopover ? this.searchValue : ''
      },
    },
    methods: {
      loadMore () {
        this.$emit('loadMore')
      },
      handleSearchFocus () {
        this.isActivePopover = true
      },
      handleSearchChange (value) {
        this.searchValue = value
        this.searchThrottle(value)
      },
      searchThrottle: throttle(function (value) {
        this.$emit('search', value)
      }, 1000),
      handleSelectChange (selected) {
        this.$emit('select', selected)
      },
      handleBodyClick (event) {
        if (!this.$refs.input.contains(event.target)) {
          this.isActivePopover = false
        }
      },
    },
  }
</script>

<style lang="scss">
  @import '../../styles/variable';
  @import '../../styles/mixin';

  .pageable-multi-search-input {
    position: relative;
    display: inline-block;
    width: 100%;

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
        margin: 0 8px;
        font-style: normal;
      }
    }

    &__popover {
      box-sizing: border-box;
      max-height: 230px;
      overflow-y: auto;
      width: 100%;

      &[x-placement^=bottom] {
        margin-top: 6px;
      }
      &[x-placement^=top] {
        margin-bottom: 6px;
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
