import Vue from 'vue'
import Router from 'vue-router'
import Store from '@/store'
import staticRouter from './staticRouter'

Vue.use(Router)

const router = new Router({
  routes: [
    ...staticRouter,
  ],
})

router.beforeEach((to, from, next) => {
  const hasToken = Store.state.token.token
  // go to system without token, redirect to login page
  if (!hasToken && to.path !== '/login') {
    next('/login')
    return
  }
  // go to login with token, redirect to current page
  if (hasToken && to.path === '/login') {
    next(from.path)
    return
  }
  next()
})
export default router
