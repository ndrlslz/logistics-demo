import { find, isNumber, get } from 'lodash-es'
import { CHART_TIME_FORMAT_TYPE, CHECK_POINT_DETAIL_TEMP_TYPE, DATE_FILTERS } from './constants'
import moment from 'moment'

export const sortHeaderBySchemaOrder = (data, schemaSort, schemaOrder) => {
  return schemaSort.map(key => {
    const properties = data[key].properties
      .filter(item => schemaOrder[key].includes(item.name))
      .sort((prev, next) => {
        return schemaOrder[key].indexOf(prev.name) - schemaOrder[key].indexOf(next.name)
      })
    return {
      ...data[key],
      name: key,
      properties,
    }
  })
}

const isHeaderChecked = (storedHeaders, sectionName, propertyName) => {
  const section = find(storedHeaders, section => section.name === sectionName)
  const item = section ? find(section.properties, property => property.name === propertyName && property.checked) : { checked: false }
  return item ? item.checked : false
}

export const calculateHeaders = (originalHeaders, fixHeaders, storedHeaders, styleClass, linkConfig) => originalHeaders.map(section => {
  return {
    ...section,
    properties: section.properties.map(property => {
      const item = {
        ...property,
        always: fixHeaders[section.name][property.name] || false,
        checked: isHeaderChecked(storedHeaders, section.name, property.name),
      }
      if (styleClass[section.name] && styleClass[section.name][property.name]) {
        item.class = `sh-table_cell--${styleClass[section.name][property.name]}`
      }
      if (linkConfig && linkConfig[section.name] && linkConfig[section.name][property.name]) {
        item.linkConfig = linkConfig[section.name][property.name]
      }
      return item
    }),
  }
})

export const buildExportDataByHeaders = (headers) => {
  return headers.map(section => {
    return {
      key: section.name,
      selects: section.properties.map(field => field.name),
    }
  })
}

export const jsonStore = {
  get: function (key) {
    let result
    try {
      result = JSON.parse(localStorage.getItem(key))
    } catch (e) {
      console.error(e)
    }

    return result
  },

  set: function (key, json) {
    localStorage.setItem(key, JSON.stringify(json))
  },
}

export const calculateSearchFields = (order = [], fieldsList = {}) => {
  return order.map(k => ({
    ...fieldsList[k],
    name: k,
  }))
}

export const filterBySearchFieldHelpersMap = (searchFields, searchFieldHelpersMap) => {
  return searchFields
    .map(group => ({
      ...group,
      properties: group.properties.filter(
        property => Object.keys(searchFieldHelpersMap[group.name]).includes(property.name),
      ),
    }))
}

export const sortBySearchFieldSchemaOrder = (searchFields, searchFieldSchemaOrder) => {
  return searchFields.map(group => {
    return {
      ...group,
      properties: group.properties.sort((prev, next) => {
        return searchFieldSchemaOrder[group.name].indexOf(prev.name) - searchFieldSchemaOrder[group.name].indexOf(next.name)
      }),
    }
  })
}

// type can be extended
export const calculateLinkableByConditionalRule = (value, ruleValue, type) => {
  switch (type) {
    case 'in':
      return ruleValue.includes(value)
    case 'eq':
    default:
      return value === ruleValue
  }
}

export const triggerDownLoadFile = (url, fileName) => {
  const downLoadEl = document.createElement('a')
  downLoadEl.href = url
  downLoadEl.download = fileName
  downLoadEl.style.display = 'none'
  document.body.appendChild(downLoadEl)
  downLoadEl.click()
  document.body.removeChild(downLoadEl)
}

export const numberToExponential = (number) => {
  const MAX_LENGTH = 8
  if (isNumber(number)) {
    const length = number.toString().length
    if (length > MAX_LENGTH) {
      const intNumber = parseInt(number)
      return intNumber.toString().length > MAX_LENGTH
        ? number.toExponential(2)
        : intNumber
    }
  }
  return number
}

export const isEmptyData = (metric) => {
  let data
  if (metric && metric.displayType === CHECK_POINT_DETAIL_TEMP_TYPE.SINGLE_TEXT) {
    data = get(metric.data, 'values', [])
  } else if (metric && metric.displayType === CHECK_POINT_DETAIL_TEMP_TYPE.MULTI_CHANNEL) {
    data = metric.data.reduce((channelRes, channel) => (
      channelRes.concat(channel.values)
    ), [])
  } else if (metric && metric.displayType === CHECK_POINT_DETAIL_TEMP_TYPE.TWO_LEVEL_MULTI_CHANNEL) {
    data = metric.data.reduce((channelRes, channel) => (
      channelRes.concat(channel.subData.reduce((subChannelRes, subChannel) => (
        subChannelRes.concat(subChannel.values)
      ), []))
    ), [])
  }
  return !(data && data.length)
}

export const isIncludesToday = ({ startDate, endDate }) => {
  const now = moment().format('YYYY-MM-DD')
  return (!startDate && !endDate) ||
    moment(now).isSameOrBefore(moment(endDate).format('YYYY-MM-DD'))
}

export const getDateRangeForSelfCompare = (selectedFilter, selectedStartDate, timeOfNow) => {
  let startDate, endDate, dayRange
  if (selectedFilter.label === DATE_FILTERS.ONE_DAY) {
    dayRange = 1
    startDate = `${moment(selectedStartDate).format('YYYY-MM-DD')} ${timeOfNow}`
    endDate = moment(startDate).add(dayRange, 'days').format('YYYY-MM-DD HH:mm:ss')
  } else {
    dayRange = moment(selectedFilter.endDate).diff(moment(selectedFilter.startDate), 'day')
    startDate = `${moment(selectedStartDate).format('YYYY-MM-DD')} 00:00:00`
    const endTime = selectedFilter.label === DATE_FILTERS.CUSTOM ? '23:59:59' : timeOfNow
    endDate = `${moment(startDate).add(dayRange, 'days').format('YYYY-MM-DD')} ${endTime}`
  }
  return {
    startDate,
    endDate,
  }
}

export const getChartFormatDate = ({ startDate, endDate }) => {
  if (startDate && endDate) {
    const dayDiff = moment(endDate).diff(moment(startDate), 'day')

    return {
      type: dayDiff ? CHART_TIME_FORMAT_TYPE.DATE : CHART_TIME_FORMAT_TYPE.HOUR,
      dateRangeDiff: dayDiff,
    }
  }
  return null
}

export const convertSingleTextToComplex = (compareMetric, originMetric) => ({
  ...compareMetric,
  displayType: originMetric.displayType,
  data: originMetric.displayType === CHECK_POINT_DETAIL_TEMP_TYPE.MULTI_CHANNEL
    ? originMetric.data.map(item => ({ ...compareMetric.data, name: item.name }))
    : originMetric.data.map(item => ({
      subName: item.subName,
      subData: item.subData.map(item => ({ ...compareMetric.data, name: item.name })),
    })),
})

export const infiniteScroll = (dom, distance, loadMore) => {
  const scrollBottom = dom.scrollTop + dom.clientHeight
  if (dom.scrollHeight - scrollBottom <= distance) {
    loadMore()
  }
}

export const getDayInterval = (timestamp1, timestamp2, format = 'days') => {
  return Math.abs(moment(timestamp1).diff(moment(timestamp2), format))
}

export const formatTimestamp = (timestamp, format = 'YYYY.MM.DD') => timestamp ? moment(timestamp).format(format) : ''

export const checkFormIsValid = async (fields) => {
  if (fields.find((f) => f.validateState === 'validating')) {
    await new Promise(resolve => setTimeout(() => {
      resolve(checkFormIsValid(fields))
    }, 300))
  }
  return fields.every(f => {
    const valid = f.isRequired && f.validateState === 'success'
    const notError = !f.isRequired && f.validateState !== 'error'
    return valid || notError
  })
}

/**
 * @param data{obj[]}
 * @param cb{function} callback
 * @param key{string}
 */
export const filterTree = (data, cb, key = 'children') => {
  return data.filter((item, index) => {
    let partResult = false
    if (item && item[key] && item[key] instanceof Array && item[key].length > 0) {
      const childResult = filterTree(item[key], cb, key)
      item[key] = childResult
      partResult = childResult.length !== 0
    }
    return partResult || cb(item, index)
  })
}
