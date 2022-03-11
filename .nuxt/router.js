import Vue from 'vue'
import Router from 'vue-router'
import { normalizeURL, decode } from 'ufo'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _393a39bc = () => interopDefault(import('..\\pages\\assistants\\index.vue' /* webpackChunkName: "pages/assistants/index" */))
const _4a781e89 = () => interopDefault(import('..\\pages\\avatars\\index.vue' /* webpackChunkName: "pages/avatars/index" */))
const _4f962a4b = () => interopDefault(import('..\\pages\\courses\\index.vue' /* webpackChunkName: "pages/courses/index" */))
const _54af6385 = () => interopDefault(import('..\\pages\\distributors\\index.vue' /* webpackChunkName: "pages/distributors/index" */))
const _6e4394b5 = () => interopDefault(import('..\\pages\\grades\\index.vue' /* webpackChunkName: "pages/grades/index" */))
const _d0c1e146 = () => interopDefault(import('..\\pages\\groups\\index.vue' /* webpackChunkName: "pages/groups/index" */))
const _00217968 = () => interopDefault(import('..\\pages\\library\\index.vue' /* webpackChunkName: "pages/library/index" */))
const _81e4ef8c = () => interopDefault(import('..\\pages\\login\\index.vue' /* webpackChunkName: "pages/login/index" */))
const _2623645b = () => interopDefault(import('..\\pages\\notifications\\index.vue' /* webpackChunkName: "pages/notifications/index" */))
const _23934ad4 = () => interopDefault(import('..\\pages\\promo\\index.vue' /* webpackChunkName: "pages/promo/index" */))
const _4fe3c1e4 = () => interopDefault(import('..\\pages\\reports\\index.vue' /* webpackChunkName: "pages/reports/index" */))
const _b7fb4024 = () => interopDefault(import('..\\pages\\settings\\index.vue' /* webpackChunkName: "pages/settings/index" */))
const _4d3ef10b = () => interopDefault(import('..\\pages\\studnets\\index.vue' /* webpackChunkName: "pages/studnets/index" */))
const _722e3cca = () => interopDefault(import('..\\pages\\subjects\\index.vue' /* webpackChunkName: "pages/subjects/index" */))
const _6f5b5280 = () => interopDefault(import('..\\pages\\teachers\\index.vue' /* webpackChunkName: "pages/teachers/index" */))
const _4c183f8a = () => interopDefault(import('..\\pages\\users\\index.vue' /* webpackChunkName: "pages/users/index" */))
const _45b44c68 = () => interopDefault(import('..\\pages\\courses\\add\\index.vue' /* webpackChunkName: "pages/courses/add/index" */))
const _2a87d9af = () => interopDefault(import('..\\pages\\courses\\_id\\index.vue' /* webpackChunkName: "pages/courses/_id/index" */))
const _3c80ed4c = () => interopDefault(import('..\\pages\\reports\\_id.vue' /* webpackChunkName: "pages/reports/_id" */))
const _3592b73e = () => interopDefault(import('..\\pages\\courses\\_id\\add.vue' /* webpackChunkName: "pages/courses/_id/add" */))
const _79f175a3 = () => interopDefault(import('..\\pages\\courses\\_id\\homework.vue' /* webpackChunkName: "pages/courses/_id/homework" */))
const _7281fbd8 = () => interopDefault(import('..\\pages\\courses\\_id\\library.vue' /* webpackChunkName: "pages/courses/_id/library" */))
const _661debd6 = () => interopDefault(import('..\\pages\\courses\\_id\\settings.vue' /* webpackChunkName: "pages/courses/_id/settings" */))
const _2a30df88 = () => interopDefault(import('..\\pages\\courses\\_id\\update.vue' /* webpackChunkName: "pages/courses/_id/update" */))
const _03ff6831 = () => interopDefault(import('..\\pages\\index.vue' /* webpackChunkName: "pages/index" */))

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
    component: _393a39bc,
    name: "assistants"
  }, {
    path: "/avatars",
    component: _4a781e89,
    name: "avatars"
  }, {
    path: "/courses",
    component: _4f962a4b,
    name: "courses"
  }, {
    path: "/distributors",
    component: _54af6385,
    name: "distributors"
  }, {
    path: "/grades",
    component: _6e4394b5,
    name: "grades"
  }, {
    path: "/groups",
    component: _d0c1e146,
    name: "groups"
  }, {
    path: "/library",
    component: _00217968,
    name: "library"
  }, {
    path: "/login",
    component: _81e4ef8c,
    name: "login"
  }, {
    path: "/notifications",
    component: _2623645b,
    name: "notifications"
  }, {
    path: "/promo",
    component: _23934ad4,
    name: "promo"
  }, {
    path: "/reports",
    component: _4fe3c1e4,
    name: "reports"
  }, {
    path: "/settings",
    component: _b7fb4024,
    name: "settings"
  }, {
    path: "/studnets",
    component: _4d3ef10b,
    name: "studnets"
  }, {
    path: "/subjects",
    component: _722e3cca,
    name: "subjects"
  }, {
    path: "/teachers",
    component: _6f5b5280,
    name: "teachers"
  }, {
    path: "/users",
    component: _4c183f8a,
    name: "users"
  }, {
    path: "/courses/add",
    component: _45b44c68,
    name: "courses-add"
  }, {
    path: "/courses/:id",
    component: _2a87d9af,
    name: "courses-id"
  }, {
    path: "/reports/:id",
    component: _3c80ed4c,
    name: "reports-id"
  }, {
    path: "/courses/:id/add",
    component: _3592b73e,
    name: "courses-id-add"
  }, {
    path: "/courses/:id/homework",
    component: _79f175a3,
    name: "courses-id-homework"
  }, {
    path: "/courses/:id/library",
    component: _7281fbd8,
    name: "courses-id-library"
  }, {
    path: "/courses/:id/settings",
    component: _661debd6,
    name: "courses-id-settings"
  }, {
    path: "/courses/:id/update",
    component: _2a30df88,
    name: "courses-id-update"
  }, {
    path: "/",
    component: _03ff6831,
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
