import Vue from 'vue'
import VueRouter from 'vue-router'

import routes from './routes'
import { LocalStorage } from 'quasar'

Vue.use(VueRouter)

/*
 * If not building with SSR mode, you can
 * directly export the Router instantiation
 */

export default function (/* { store, ssrContext } */) {
  const Router = new VueRouter({
    scrollBehavior: () => ({ x: 0, y: 0 }),
    routes,

    // Leave these as is and change from quasar.conf.js instead!
    // quasar.conf.js -> build -> vueRouterMode
    // quasar.conf.js -> build -> publicPath
    mode: process.env.VUE_ROUTER_MODE,
    base: process.env.VUE_ROUTER_BASE
  })

  Router.beforeEach((to, from, next) => {

    let auth, now, expired, validToken

    auth = LocalStorage.getItem(`${process.env.APP_MACHINE_NAME}-auth`)

    if (auth) {
      now = new Date()
      expired = now > new Date(auth.expires_at)

      if (!auth.expires_at) {
        expired = true
      }

      validToken = auth.token && !expired
    } else {
      expired = true
      validToken = false
    }

    if (to.matched.some(record => record.meta.requiresAuth)) {
      if (!validToken) {
        next({
          name: 'auth.login',
          query: { redirect: to.fullPath }
        })
      } else {
        next()
      }
    } else if (to.matched.some(record => record.meta.guest)) {
      if (!validToken) {
        next()
      } else {
        next({ name: 'dashboard' })
      }
    } else {
      next()
    }
  })

  return Router
}
