import Vue from 'vue'

Vue.directive('click-outside', {
  bind: function (el, binding, vnode) {
    el.event = function (event) {
      if (!(
        el === event.target ||
        el.contains(event.target)
      )) {
        vnode.context[binding.expression](event)
      }
    }

    const object = document.getElementById('app')
    object.addEventListener('click', el.event)
    object.addEventListener('focusin', el.event)
  },
  unbind: function (el) {
    const object = document.getElementById('app')
    object.removeEventListener('click', el.event)
    object.removeEventListener('focusin', el.event)
  },
})
