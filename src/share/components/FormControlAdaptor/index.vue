<template>
  <component
    v-if="name"
    :is="name"
    @change="changeHandler"
    @searchInputChange="searchInputHandler"
    v-bind="binds"
  />
</template>

<script>
  import ShAutoComplete from '../ShAutoComplete'
  import ShDateRange from '../ShDateRange'
  import ShInput from '../ShInput'
  import ShSingleSearchInput from '../ShSingleSearchInput'
  import ShMultiSearchInput from '../ShMultiSearchInput'
  import ShNumberRange from '../ShNumberRange'
  import ShSelect from '../ShSelect'

  export default {
    name: 'FormControlAdaptor',
    components: {
      ShAutoComplete: ShAutoComplete,
      ShNumberRange: ShNumberRange,
      ShDateRange: ShDateRange,
      ShInput: ShInput,
      ShMultiSearchInput: ShMultiSearchInput,
      ShSelect: ShSelect,
      ShSingleSearchInput: ShSingleSearchInput,
    },
    props: {
      name: String,
      changeHandler: Function,
      searchInputHandler: Function,
      binds: Object,
    },
  }
</script>
