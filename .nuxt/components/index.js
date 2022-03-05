export const Breadcrumbs = () => import('../../components/Breadcrumbs.vue' /* webpackChunkName: "components/breadcrumbs" */).then(c => wrapFunctional(c.default || c))
export const HomeCards = () => import('../../components/HomeCards.vue' /* webpackChunkName: "components/home-cards" */).then(c => wrapFunctional(c.default || c))
export const NavBar = () => import('../../components/NavBar.vue' /* webpackChunkName: "components/nav-bar" */).then(c => wrapFunctional(c.default || c))
export const NavBarList = () => import('../../components/NavBarList.vue' /* webpackChunkName: "components/nav-bar-list" */).then(c => wrapFunctional(c.default || c))
export const NavBarLogo = () => import('../../components/NavBarLogo.vue' /* webpackChunkName: "components/nav-bar-logo" */).then(c => wrapFunctional(c.default || c))
export const Loading = () => import('../../components/loading.vue' /* webpackChunkName: "components/loading" */).then(c => wrapFunctional(c.default || c))

// nuxt/nuxt.js#8607
function wrapFunctional(options) {
  if (!options || !options.functional) {
    return options
  }

  const propKeys = Array.isArray(options.props) ? options.props : Object.keys(options.props || {})

  return {
    render(h) {
      const attrs = {}
      const props = {}

      for (const key in this.$attrs) {
        if (propKeys.includes(key)) {
          props[key] = this.$attrs[key]
        } else {
          attrs[key] = this.$attrs[key]
        }
      }

      return h(options, {
        on: this.$listeners,
        attrs,
        props,
        scopedSlots: this.$scopedSlots,
      }, this.$slots.default)
    }
  }
}
