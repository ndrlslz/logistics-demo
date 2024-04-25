import mutationTypes from '../mutationTypes'
import sensorApis from '@/apis/sensor'
import { get } from 'lodash'

const state = {
  sensors: [],
  sensorsStatus: [],
  sensorsDayData: [],
}

const actions = {
  getSensors ({ commit, dispatch }) {
    dispatch('ui/showLoading', { type: 'default' }, { root: true })
    return sensorApis.getSensors()
      .then(res => {
        commit(mutationTypes.GET_SENSORS, res)
      })
      .catch(error => {
        dispatch('ui/showToast', { text: get(error, 'response.data.errorMessage', '系统错误'), type: '' }, { root: true })
      })
      .finally(() => {
        dispatch('ui/hideLoading', { type: 'default' }, { root: true })
      })
  },
  getSensorsStatus ({ commit, dispatch }) {
    dispatch('ui/showLoading', { type: 'default' }, { root: true })
    return sensorApis.getSensorsStatus()
      .then(res => {
        commit(mutationTypes.GET_SENSORS_STATUS, res)
      })
      .catch(error => {
        dispatch('ui/showToast', { text: get(error, 'response.data.errorMessage', '系统错误'), type: '' }, { root: true })
      })
      .finally(() => {
        dispatch('ui/hideLoading', { type: 'default' }, { root: true })
      })
  },
  getSensorsDayData ({ commit, dispatch }, { sensorId }) {
    dispatch('ui/showLoading', { type: 'default' }, { root: true })
    return sensorApis.getSensorsDayData({ sensorId })
      .then(res => {
        commit(mutationTypes.GET_SENSORS_DAY_DATA, res)
      })
      .catch(error => {
        dispatch('ui/showToast', { text: get(error, 'response.data.errorMessage', '系统错误'), type: '' }, { root: true })
      })
      .finally(() => {
        dispatch('ui/hideLoading', { type: 'default' }, { root: true })
      })
  },
}

const mutations = {
  [mutationTypes.GET_SENSORS] (state, payload) {
    state.sensors = payload
  },
  [mutationTypes.GET_SENSORS_STATUS] (state, payload) {
    state.sensorsStatus = payload
  },
  [mutationTypes.GET_SENSORS_DAY_DATA] (state, payload) {
    state.sensorsDayData = payload
  },
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
}
