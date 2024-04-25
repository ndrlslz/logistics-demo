import Vue from 'vue'

Vue.directive('el-select-loadmore', {
  inserted (el, binding) {
    const SELECT_DOM = el.querySelector('.el-select-dropdown .el-select-dropdown__wrap')
    SELECT_DOM.addEventListener('scroll', function () {
      const CONDITION = this.scrollHeight - this.scrollTop <= this.clientHeight
      if (CONDITION) {
        binding.value()
      }
    })
  },
})
