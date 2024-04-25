import Vue from 'vue'
import Vuex from 'vuex'

import token from './modules/token'
import ui from './modules/ui'
import sensor from './modules/sensor'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    token,
    ui,
    sensor,
  },
})
