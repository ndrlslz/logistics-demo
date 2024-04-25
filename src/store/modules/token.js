import mutationTypes from '../mutationTypes'
import { IOT_TOOLBOX_TOKEN_KEY, SECRET } from '@/utils/constants'
import jwtEncode from 'jwt-encode'
import jwtDecode from 'jwt-decode'

const state = {
  token: localStorage.getItem(IOT_TOOLBOX_TOKEN_KEY),
}

const getters = {
  getUserInfo: (state) => {
    const decodeToken = state.token ? jwtDecode(state.token) : {}
    return {
      userName: decodeToken.userName,
    }
  },
}

const actions = {
  setToken ({ commit }, payload) {
    commit(mutationTypes.TOKEN_SET_TOKEN, payload)
  },
  clearToken ({ commit }) {
    commit(mutationTypes.TOKEN_CLEAR_TOKEN)
  },
}

const mutations = {
  [mutationTypes.TOKEN_SET_TOKEN] (state, payload) {
    const token = jwtEncode(payload, SECRET)
    localStorage.setItem(IOT_TOOLBOX_TOKEN_KEY, token)
    state.token = token
  },
  [mutationTypes.TOKEN_CLEAR_TOKEN] (state) {
    localStorage.removeItem(IOT_TOOLBOX_TOKEN_KEY)
    state.token = null
  },
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
}
