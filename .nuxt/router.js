import Vue from 'vue'
import Router from 'vue-router'
import { normalizeURL, decode } from 'ufo'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _1692414d = () => interopDefault(import('../pages/assistants/index.vue' /* webpackChunkName: "pages/assistants/index" */))
const _967cd250 = () => interopDefault(import('../pages/avatars/index.vue' /* webpackChunkName: "pages/avatars/index" */))
const _649bea54 = () => interopDefault(import('../pages/courses/index.vue' /* webpackChunkName: "pages/courses/index" */))
const _f3e50d38 = () => interopDefault(import('../pages/distributors/index.vue' /* webpackChunkName: "pages/distributors/index" */))
const _2ec76534 = () => interopDefault(import('../pages/grades/index.vue' /* webpackChunkName: "pages/grades/index" */))
const _978414e8 = () => interopDefault(import('../pages/groups/index.vue' /* webpackChunkName: "pages/groups/index" */))
const _69bc37ce = () => interopDefault(import('../pages/library/index.vue' /* webpackChunkName: "pages/library/index" */))
const _3fac5207 = () => interopDefault(import('../pages/login/index.vue' /* webpackChunkName: "pages/login/index" */))
const _3d9df1c6 = () => interopDefault(import('../pages/notifications/index.vue' /* webpackChunkName: "pages/notifications/index" */))
const _7476d42d = () => interopDefault(import('../pages/promo/index.vue' /* webpackChunkName: "pages/promo/index" */))
const _5412c7c6 = () => interopDefault(import('../pages/reports/index.vue' /* webpackChunkName: "pages/reports/index" */))
const _f4e635c4 = () => interopDefault(import('../pages/studnets/index.vue' /* webpackChunkName: "pages/studnets/index" */))
const _65b5a57f = () => interopDefault(import('../pages/subjects/index.vue' /* webpackChunkName: "pages/subjects/index" */))
const _3c540109 = () => interopDefault(import('../pages/teachers/index.vue' /* webpackChunkName: "pages/teachers/index" */))
const _408a75e6 = () => interopDefault(import('../pages/users/index.vue' /* webpackChunkName: "pages/users/index" */))
const _6acb9ce8 = () => interopDefault(import('../pages/courses/add/index.vue' /* webpackChunkName: "pages/courses/add/index" */))
const _97846a7e = () => interopDefault(import('../pages/courses/_id/index.vue' /* webpackChunkName: "pages/courses/_id/index" */))
const _7bc701c5 = () => interopDefault(import('../pages/reports/_id.vue' /* webpackChunkName: "pages/reports/_id" */))
const _43d5c4d0 = () => interopDefault(import('../pages/courses/_id/add.vue' /* webpackChunkName: "pages/courses/_id/add" */))
const _05b21351 = () => interopDefault(import('../pages/courses/_id/homework.vue' /* webpackChunkName: "pages/courses/_id/homework" */))
const _667ff06a = () => interopDefault(import('../pages/courses/_id/library.vue' /* webpackChunkName: "pages/courses/_id/library" */))
const _1c42ecf8 = () => interopDefault(import('../pages/courses/_id/settings.vue' /* webpackChunkName: "pages/courses/_id/settings" */))
const _d0207d2c = () => interopDefault(import('../pages/courses/_id/update.vue' /* webpackChunkName: "pages/courses/_id/update" */))
const _ea6fc926 = () => interopDefault(import('../pages/index.vue' /* webpackChunkName: "pages/index" */))

const emptyFn = () => {}

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: '/',
  linkActiveClass: 'nuxt-link-active',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior,

  routes: [{
    path: "/assistants",
    component: _1692414d,
    name: "assistants"
  }, {
    path: "/avatars",
    component: _967cd250,
    name: "avatars"
  }, {
    path: "/courses",
    component: _649bea54,
    name: "courses"
  }, {
    path: "/distributors",
    component: _f3e50d38,
    name: "distributors"
  }, {
    path: "/grades",
    component: _2ec76534,
    name: "grades"
  }, {
    path: "/groups",
    component: _978414e8,
    name: "groups"
  }, {
    path: "/library",
    component: _69bc37ce,
    name: "library"
  }, {
    path: "/login",
    component: _3fac5207,
    name: "login"
  }, {
    path: "/notifications",
    component: _3d9df1c6,
    name: "notifications"
  }, {
    path: "/promo",
    component: _7476d42d,
    name: "promo"
  }, {
    path: "/reports",
    component: _5412c7c6,
    name: "reports"
  }, {
    path: "/studnets",
    component: _f4e635c4,
    name: "studnets"
  }, {
    path: "/subjects",
    component: _65b5a57f,
    name: "subjects"
  }, {
    path: "/teachers",
    component: _3c540109,
    name: "teachers"
  }, {
    path: "/users",
    component: _408a75e6,
    name: "users"
  }, {
    path: "/courses/add",
    component: _6acb9ce8,
    name: "courses-add"
  }, {
    path: "/courses/:id",
    component: _97846a7e,
    name: "courses-id"
  }, {
    path: "/reports/:id",
    component: _7bc701c5,
    name: "reports-id"
  }, {
    path: "/courses/:id/add",
    component: _43d5c4d0,
    name: "courses-id-add"
  }, {
    path: "/courses/:id/homework",
    component: _05b21351,
    name: "courses-id-homework"
  }, {
    path: "/courses/:id/library",
    component: _667ff06a,
    name: "courses-id-library"
  }, {
    path: "/courses/:id/settings",
    component: _1c42ecf8,
    name: "courses-id-settings"
  }, {
    path: "/courses/:id/update",
    component: _d0207d2c,
    name: "courses-id-update"
  }, {
    path: "/",
    component: _ea6fc926,
    name: "index"
  }],

  fallback: false
}

export function createRouter (ssrContext, config) {
  const base = (config._app && config._app.basePath) || routerOptions.base
  const router = new Router({ ...routerOptions, base  })

  // TODO: remove in Nuxt 3
  const originalPush = router.push
  router.push = function push (location, onComplete = emptyFn, onAbort) {
    return originalPush.call(this, location, onComplete, onAbort)
  }

  const resolve = router.resolve.bind(router)
  router.resolve = (to, current, append) => {
    if (typeof to === 'string') {
      to = normalizeURL(to)
    }
    return resolve(to, current, append)
  }

  return router
}
