<template>
  <el-input
    class="input-group"
    :value="value"
    :placeholder="placeholder"
    :clearable="clearable"
    @change="handleChange"
  >
    <el-button
      class="input-search"
      slot="append"
      icon="el-icon-search"
      @click="search"
    >搜索
    </el-button>
  </el-input>
</template>

<script>
  import { Input, Button } from 'element-ui'

  export default {
    name: 'ShInputSearch',
    components: {
      ElButton: Button,
      ElInput: Input,
    },
    model: {
      prop: 'value',
      event: 'change',
    },
    props: {
      value: String,
      placeholder: String,
      clearable: Boolean,
    },
    methods: {
      search () {
        this.$emit('search')
      },
      handleChange (value) {
        this.$emit('change', value)
      },
    },
  }
</script>

<style lang="scss">
  @import '../../styles/variable';

  .input-group {
    input.el-input__inner {
      border-radius: 2px 0 0 2px;
    }

    .el-input-group__append {
      color: $color-base;
      border-radius: 0 2px 2px 0;
      border-color: $color-shell-yellow;
      background-color: $color-shell-yellow;
      button {
        border-radius: 0 2px 2px 0;
      }
    }
  }
</style>
