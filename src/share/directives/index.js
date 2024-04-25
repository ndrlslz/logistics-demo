import Vue from 'vue'
import { get, intersection } from 'lodash-es'

Vue.directive('auth', {
  inserted (el, binding, vnode) {
    const userRoles = get(vnode, 'context.$store.getters["token/userInfo"].roles', [])
    const permissions = [].concat(binding.value)

    if (!intersection(userRoles, permissions).length) {
      el.parentElement.removeChild(el)
    }
  },
})
