<template>
  <div class="number-range" @click.stop>
    <comp-input
      type="number"
      :value="minValue"
      @input="handleMinValueChange"
      :placeholder="minValuePlaceholder"
      clearable="clearable"
    />
    <hr class="number-range__separator"/>
    <comp-input
      type="number"
      :value="maxValue"
      @input="handleMaxValueChange"
      :placeholder="maxValuePlaceholder"
      clearable="clearable"
    />
    <comp-select
      v-if="units.length"
      :value="unitValue"
      @input="handleUnitValueChange"
      clearable="clearable"
    >
      <comp-option
        class="unit-item"
        v-for="item in units"
        :key="item"
        :label="item"
        :value="item"
      />
    </comp-select>
  </div>
</template>

<script>
  import { isArray } from 'lodash-es'
  import { Input, Select, Option } from 'element-ui'

  export default {
    name: 'ShNumberRange',
    components: {
      CompInput: Input,
      CompSelect: Select,
      CompOption: Option,
    },
    props: {
      value: Array,
      units: {
        type: Array,
        default: () => ([]),
      },
      minValuePlaceholder: String,
      maxValuePlaceholder: String,
    },
    computed: {
      minValue () {
        return isArray(this.value) ? this.value[0] : undefined
      },
      maxValue () {
        return isArray(this.value) ? this.value[1] : undefined
      },
      unitValue () {
        return isArray(this.value) ? this.value[2] : undefined
      },
    },
    methods: {
      handleMinValueChange (newValue) {
        if (this.units.length) {
          this.$emit('change', [newValue, this.maxValue, this.unitValue])
        } else {
          this.$emit('change', [newValue, this.maxValue])
        }
      },
      handleMaxValueChange (newValue) {
        if (this.units.length) {
          this.$emit('change', [this.minValue, newValue, this.unitValue])
        } else {
          this.$emit('change', [this.minValue, newValue])
        }
      },
      handleUnitValueChange (newValue) {
        this.$emit('change', [this.minValue, this.maxValue, newValue])
      },
    },
  }
</script>

<style lang="scss">
  @import '../../styles/variable';
  @import '../../styles/mixin';

  .number-range {
    align-items: center;
    display: inline-flex;

    .el-input {
      width: 80px;

      input {
        padding: 0 8px;
      }
    }

    div.el-input--suffix .el-input__inner {
      padding: 0 8px;
    }

    &__separator{
      background-color: #d9d9d9;
      border: none;
      display: inline-block;
      height: 1px;
      margin: 0 8px;
      width: 10px;
    }

    .el-select {
      margin-left: 4px;
    }
  }
</style>
