import Vue from 'vue'
import moment from 'moment'

Vue.filter('separateNumber', (value, digits = 0) => {
  const num = Number(value)
  if (Number.isNaN(num)) {
    return value
  }
  return num.toLocaleString('en-US', { minimumFractionDigits: digits })
})

Vue.filter('textForNoData', (value) => !value ? '无' : value)

Vue.filter('textForList', (list, symbol) => (list || []).join(symbol) || '无')

Vue.filter('textForTimestamp', (value, format) => !value ? '无' : moment(value).format(format))
