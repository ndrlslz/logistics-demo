<template>
  <div class="month-range">
    <comp-date-picker
      :class="{'large-width': type === 'datetime'}"
      :type="type"
      :value="minValue"
      @input="handleMinValueInput"
      :placeholder="minValuePlaceholder"
      :picker-options="pickerOptions"
    ></comp-date-picker>
    <hr class="month-range__separator" />
    <comp-date-picker
      :class="{'large-width': type === 'datetime'}"
      :type="type"
      :value="maxValue"
      @input="handleMaxValueInput"
      :placeholder="maxValuePlaceholder"
      :picker-options="pickerOptions"
    ></comp-date-picker>
  </div>
</template>

<script>
  import { isArray } from 'lodash-es'
  import { DatePicker } from 'element-ui'

  export default {
    name: 'ShDateRange',
    components: {
      CompDatePicker: DatePicker,
    },
    props: {
      value: Array,
      type: String,
      minValuePlaceholder: String,
      maxValuePlaceholder: String,
      disabledFuture: {
        type: Boolean,
        default: false,
      },
    },
    computed: {
      minValue () {
        return isArray(this.value) ? this.value[0] : undefined
      },
      maxValue () {
        return isArray(this.value) ? this.value[1] : undefined
      },
      pickerOptions () {
        return {
          disabledDate: (date) => {
            return this.disabledFuture ? date.getTime() >= Date.now() : false
          },
        }
      },
    },
    methods: {
      handleMinValueInput (newValue) {
        this.$emit('change', [newValue, this.maxValue])
      },
      handleMaxValueInput (newValue) {
        this.$emit('change', [this.minValue, newValue])
      },
    },
  }
</script>

<style lang="scss">
@import '../../styles/variable';

.month-range {
  align-items: center;
  display: inline-flex;
  background-color: transparent;

  div.el-input.large-width {
    width: 200px;
  }

  .el-date-editor.el-input,
  .el-date-editor.el-input__inner {
    width: $sm-width;
  }

  .el-input__inner {
    text-align: center;
  }

  .month-range__separator {
    background-color: #d9d9d9;
    border: none;
    display: inline-block;
    height: 1px;
    margin: 0 8px;
    width: 10px;
  }
}

.el-time-spinner.has-seconds {
  font-size: 12px;
}
</style>
