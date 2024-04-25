import mutationTypes from '../mutationTypes'

const state = {
  loading: false,
  button: {
    loading: false,
  },
  select: {
    loading: false,
  },
  toast: {
    visible: false,
    config: {},
  },
}

const actions = {
  showLoading ({ commit }, { type }) {
    commit(mutationTypes.UI_SHOW_LOADING, type)
  },
  hideLoading ({ commit }, { type }) {
    commit(mutationTypes.UI_HIDE_LOADING, type)
  },
  showToast ({ state, commit, dispatch }, payload) {
    commit(mutationTypes.UI_SHOW_TOAST, payload)

    if (payload.alwaysShow) {
      return
    }

    let duration = 2000

    if (payload && payload.duration) {
      duration = payload.duration
    }

    window.setTimeout(() => {
      if (payload.type === 'loading' && state.toast.visible === true) {
        commit(mutationTypes.UI_HIDE_TOAST)
        payload.text = '请求超时,请稍后刷新重试'
        payload.duration = 2000
        payload.type = ''
        dispatch('showToast', payload)
      } else {
        commit(mutationTypes.UI_HIDE_TOAST)
      }
    }, duration)
  },
  hideToast ({ commit }) {
    commit(mutationTypes.UI_HIDE_TOAST)
  },
}

const mutations = {
  [mutationTypes.UI_SHOW_LOADING] (state, type) {
    if (type === 'default') {
      state.loading = true
    } else {
      state[type].loading = true
    }
  },
  [mutationTypes.UI_HIDE_LOADING] (state, type) {
    if (type === 'default') {
      state.loading = false
    } else {
      state[type].loading = false
    }
  },
  [mutationTypes.UI_SHOW_TOAST] (state, payload) {
    state.toast = {
      visible: true,
      config: payload,
    }
  },
  [mutationTypes.UI_HIDE_TOAST] (state) {
    state.toast = {
      visible: false,
      config: {},
    }
  },
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
}
