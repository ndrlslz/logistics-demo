<template>
  <div @click.stop>
    <comp-input
      :class="['comp-wrapper', {'search-input-with-prefix-icon': searchable}]"
      :value="value"
      @input="handleInput"
      :placeholder="placeholder"
      :clearable="clearable"
      :maxlength="maxLength"
    >
      <i v-if="searchable" slot="prefix" class="icon-group-search"></i>
    </comp-input>
  </div>
</template>

<script>
  import { Input } from 'element-ui'

  export default {
    name: 'ShInput',
    components: {
      CompInput: Input,
    },
    props: {
      value: String,
      placeholder: String,
      clearable: Boolean,
      maxLength: Number,
      searchable: Boolean,
    },
    methods: {
      handleInput (value) {
        this.$emit('input', value)
        this.$emit('change', value)
      },
    },
  }
</script>
<style lang="scss" scoped>

div.comp-wrapper {
  width: 100%;
}
</style>
