// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'babel-polyfill'
import Vue from 'vue'
import VTooltip from 'v-tooltip'
import VueScroll from 'vue-scroll'
import VuePhotoPreview from 'vue-photo-preview'
import 'vue-photo-preview/dist/skin.css'
import App from './App'
import router from './router'
import store from './store'
import VueCompositionAPI from '@vue/composition-api'
import './element-ui'
import '@/share/filters'
import '@/share/directives/loadMore'
import '@/share/directives/index'
import '@/share/directives/outside-click'

import '@/share/assets/icons'
import '@/share/assets/icons.css'
import '@/share/styles/theme.scss'

Vue.use(VTooltip)
Vue.use(VueScroll)
Vue.use(VuePhotoPreview)
Vue.use(VueCompositionAPI)

Vue.config.productionTip = false
Vue.prototype.$ELEMENT = { size: 'medium' }

const mountApp = () => {
  return new Vue({
    el: '#app',
    store,
    router,
    components: { App },
    template: '<App/>',
  })
}

mountApp()
