<template>
  <compo-select
    class="sh-select"
    :value="value"
    @change="handleChange"
    :placeholder="placeholder"
    :loading="loading"
    loadingText="加载中..."
    :multiple="multiple"
    :disabled="disabled"
    :clearable="clearable"
    :filterable="filterable"
    :remote="remote"
    :remote-method="remoteMethod"
    @visible-change="onVisibleChange"
  >
    <compo-option
      class="sh-select-options"
      v-for="option in formattedOptions"
      :key="option.value"
      :label="option.label | toString"
      :value="option.value | toString"
    />
  </compo-select>
</template>

<script>
  import { isString } from 'lodash-es'
  import { Select, Option } from 'element-ui'

  export default {
    name: 'ShSelect',
    model: {
      prop: 'value',
      event: 'change',
    },
    components: {
      CompoSelect: Select,
      CompoOption: Option,
    },
    props: {
      value: {
        required: true,
      },
      options: {
        type: Array,
        default: () => ([]),
      },
      multiple: {
        type: Boolean,
        default: false,
      },
      loading: {
        type: Boolean,
        default: false,
      },
      placeholder: {
        type: String,
        default: '请选择',
      },
      disabled: {
        type: Boolean,
        default: false,
      },
      clearable: {
        type: Boolean,
        default: true,
      },
      filterable: {
        type: Boolean,
        default: false,
      },
      remote: {
        type: Boolean,
        default: false,
      },
      remoteMethod: {
        type: Function,
        default: () => {},
      },
    },
    computed: {
      formattedOptions () {
        return this.options.map(option => isString(option) ? { value: option, label: option } : option)
      },
    },
    methods: {
      handleChange (v) {
        this.$emit('change', v)
      },
      onVisibleChange (isVisible) {
        this.$emit('onVisibleChange', isVisible)
      },
    },
    filters: {
      // 由于 element-ui 的 option 不能接受 false 作为 value，只能将值全部转换成字符串，之后传递给后端的时候，手动将布尔字符串转换回布尔值
      toString (value) {
        return value.toString()
      },
    },
  }
</script>
