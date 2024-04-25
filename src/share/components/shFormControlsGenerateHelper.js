import moment from 'moment'
import { isEmpty } from 'lodash-es'

export const formatOptions = (data) => {
  if (isEmpty(data)) {
    return { options: [] }
  }
  return Array.isArray(data) ? { options: data } : { options: data.predefined, extOptions: data.additional }
}

/**
 * 通过此 helper 可以动态生成 Sh* 表单控件组件的属性
 * 以下每一大块对应一种业务需求上的组件，例如 textAutoComplete, numberRange 等
 * @type: 一个表示业务需求对应的控件类型的常量
 * @hasOptions: 当前组件是否需要传递 options 属性，用于提供可选择项，例如单选、多选等组件
 * @calcResultByValue: 通过控件的值计算得到需要传递给后端的值
 * @generateComponentPropsHelper: 输入 value, changeHandler, options, fixedConfigs，输出属性值，通过 Adaptor 组件传递给控件组件
 */
export default {
  textInput: {
    type: 'TEXT_INPUT',
    hasOptions: false,
    calcResultByValue: value => value || undefined,
    generateComponentPropsHelper: ({ value, changeHandler, searchInputHandler }, fixedConfigs = {}) => ({
      name: 'ShInput',
      changeHandler: changeHandler || (() => {}),
      searchInputHandler: searchInputHandler || (() => {}),
      binds: {
        value: value || '',
        ...fixedConfigs,
      },
    }),
  },

  textAutoComplete: {
    type: 'TEXT_AUTO_COMPLETE',
    hasOptions: true,
    calcResultByValue: value => value || undefined,
    generateComponentPropsHelper: ({ value, changeHandler, searchInputHandler, options }, fixedConfigs = {}) => ({
      name: 'ShAutoComplete',
      changeHandler: changeHandler || (() => {}),
      searchInputHandler: searchInputHandler || (() => {}),
      binds: {
        value: value || '',
        ...options,
        ...fixedConfigs,
      },
    }),
  },

  numberRange: {
    type: 'NUMBER_RANGE',
    hasOptions: false,
    calcResultByValue: value => ({
      from: (value && value[0]) || undefined,
      to: (value && value[1]) || undefined,
    }),
    generateComponentPropsHelper: ({ value, changeHandler, searchInputHandler }, fixedConfigs = {}) => ({
      name: 'ShNumberRange',
      changeHandler: changeHandler || (() => {}),
      searchInputHandler: searchInputHandler || (() => {}),
      binds: {
        minValuePlaceholder: '最小值',
        maxValuePlaceholder: '最大值',
        value: value || Array(2),
        ...fixedConfigs,
      },
    }),
  },

  numberRangeWithUnit: {
    type: 'NUMBER_RANGE_WITH_UNIT',
    hasOptions: false,
    calcResultByValue: value => ({
      from: (value && value[0]) || undefined,
      to: (value && value[1]) || undefined,
      unit: (value && value[2]) || undefined,
    }),
    generateComponentPropsHelper: ({ value, changeHandler, searchInputHandler }, fixedConfigs = {}) => ({
      name: 'ShNumberRange',
      changeHandler: changeHandler || (() => {}),
      searchInputHandler: searchInputHandler || (() => {}),
      binds: {
        minValuePlaceholder: '最小值',
        maxValuePlaceholder: '最大值',
        value: value || Array(3),
        ...fixedConfigs,
      },
    }),
  },

  enumRadio: {
    type: 'ENUM_RADIO',
    hasOptions: true,
    calcResultByValue: value => {
      switch (value) {
        case 'true':
          return true
        case 'false':
          return false
        default:
          return value || undefined
      }
    },
    // generateComponentPropsHelper: ({value, changeHandler, options}, fixedConfigs = {}) => ({
    //   name: 'ShSelect',
    //   changeHandler: changeHandler || (() => {}),
    //   binds: {
    //     multiple: false,
    //     value: value || '',
    //     ...options,
    //     ...fixedConfigs,
    //   },
    // }),
    generateComponentPropsHelper: ({ value, changeHandler, searchInputHandler, options }, fixedConfigs = {}) => {
      return {
        name: 'ShSelect',
        changeHandler: changeHandler || (() => {}),
        searchInputHandler: searchInputHandler || (() => {}),
        binds: {
          multiple: false,
          value: value || '',
          ...options,
          ...fixedConfigs,
        },
      }
    },
  },

  enumExactCheckbox: {
    type: 'ENUM_EXACT_CHECKBOX',
    hasOptions: true,
    calcResultByValue: values => {
      return values.map(value => {
        switch (value) {
          // due to component's issue, must use string as boolean value, but it need to be converted to boolean when pass to back end
          case 'true':
            return true
          case 'false':
            return false
          default:
            return value || undefined
        }
      })
    },
    generateComponentPropsHelper: ({ value, changeHandler, searchInputHandler, options }, fixedConfigs = {}) => ({
      name: 'ShSelect',
      changeHandler: changeHandler || (() => {}),
      searchInputHandler: searchInputHandler || (() => {}),
      binds: {
        multiple: true,
        value: value || [],
        ...options,
        ...fixedConfigs,
      },
    }),
  },

  enumSearchableRadio: {
    type: 'ENUM_SEARCHABLE_RADIO',
    hasOptions: true,
    calcResultByValue: value => value || undefined,
    generateComponentPropsHelper: ({ value, changeHandler, searchInputHandler, options }, fixedConfigs = {}) => ({
      name: 'ShSingleSearchInput',
      changeHandler: changeHandler || (() => {}),
      searchInputHandler: searchInputHandler || (() => {}),
      binds: {
        multiple: false,
        value: value || undefined,
        ...options,
        ...fixedConfigs,
      },
    }),
  },

  enumSearchableCheckbox: {
    type: 'ENUM_SEARCHABLE_CHECKBOX',
    hasOptions: true,
    calcResultByValue: value => {
      if (isEmpty(value) || isEmpty(value.selectedOptions)) {
        return
      }
      return { exactValues: value.selectedOptions } // 对于后端，选中项都是精确匹配
    },
    generateComponentPropsHelper: ({ value, changeHandler, searchInputHandler, options }, fixedConfigs = {}) => ({
      name: 'ShMultiSearchInput',
      changeHandler: changeHandler || (() => {}),
      searchInputHandler: searchInputHandler || (() => {}),
      binds: {
        multiple: true,
        value: value || {},
        ...options,
        ...fixedConfigs,
      },
    }),
  },

  monthRange: {
    type: 'MONTH_RANGE',
    hasOptions: false,
    calcResultByValue: value => ({
      from: (value && value[0] && moment(value[0]).format('YYYY-MM')) || undefined,
      to: (value && value[1] && moment(value[1]).format('YYYY-MM')) || undefined,
    }),
    generateComponentPropsHelper: ({ value, changeHandler, searchInputHandler }, fixedConfigs = {}) => ({
      name: 'ShDateRange',
      changeHandler: changeHandler || (() => {}),
      searchInputHandler: searchInputHandler || (() => {}),
      binds: {
        type: 'month',
        minValuePlaceholder: '起始时间',
        maxValuePlaceholder: '结束时间',
        value: value || [],
        ...fixedConfigs,
      },
    }),
  },

  dateRange: {
    type: 'DATE_RANGE',
    hasOptions: false,
    calcResultByValue: value => ({
      from: (value && value[0] && moment(value[0]).format('YYYY-MM-DD')) || undefined,
      to: (value && value[1] && moment(value[1]).format('YYYY-MM-DD')) || undefined,
    }),
    generateComponentPropsHelper: ({ value, changeHandler, searchInputHandler }, fixedConfigs = {}) => ({
      name: 'ShDateRange',
      changeHandler: changeHandler || (() => {}),
      searchInputHandler: searchInputHandler || (() => {}),
      binds: {
        type: 'date',
        minValuePlaceholder: '起始日期',
        maxValuePlaceholder: '结束日期',
        value: value || [],
        ...fixedConfigs,
      },
    }),
  },

  dateTimeRange: {
    type: 'DATE_TIME_RANGE',
    hasOptions: false,
    calcResultByValue: value => ({
      from: (value && value[0] && moment(value[0]).format('YYYY-MM-DD HH:mm')) || undefined,
      to: (value && value[1] && moment(value[1]).format('YYYY-MM-DD HH:mm')) || undefined,
    }),
    generateComponentPropsHelper: ({ value, changeHandler, searchInputHandler }, fixedConfigs = {}) => ({
      name: 'ShDateRange',
      changeHandler: changeHandler || (() => {}),
      searchInputHandler: searchInputHandler || (() => {}),
      binds: {
        type: 'datetime',
        minValuePlaceholder: '起始时间',
        maxValuePlaceholder: '结束时间',
        value: value || [],
        ...fixedConfigs,
      },
    }),
  },
}
