export { default as Breadcrumbs } from '../../components/Breadcrumbs.vue'
export { default as HomeCards } from '../../components/HomeCards.vue'
export { default as NavBar } from '../../components/NavBar.vue'
export { default as NavBarList } from '../../components/NavBarList.vue'
export { default as NavBarLogo } from '../../components/NavBarLogo.vue'
export { default as Loading } from '../../components/loading.vue'

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
