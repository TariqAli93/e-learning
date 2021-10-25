export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    titleTemplate: '%s - e-learning',
    title: 'e-learning',
    htmlAttrs: {
      lang: 'ar'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'preconnect', href: 'https://fonts.googleapis.com'}
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '@/assets/custom-icons.css',
    'vue-wysiwyg/dist/vueWysiwyg.css'
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '~/plugins/VueWysiwyg.js'
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,
  loading: { color: '#fff', throttle: 0, rtl: true },

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
    // https://go.nuxtjs.dev/vuetify
    '@nuxtjs/vuetify',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    '@nuxtjs/toast',
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    baseURL: 'http://217.71.201.51/api/'
    // baseURL: 'http://localhost:5000/api'
  },

  // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    rtl: true,
    theme: {
      dark: true,
      themes: {
        dark: {
          primary: '#2C313A',
          secondary: '#363C47',
          success: '#A5CCD1',
          warning: '#FECDAA',
          info: '#A3D5FF',
          error: '#EC465A',
          text: '#E4E0E7',
          background: '#2C313A'
        },

        light: {
          primary: '#C9CCD5',
          secondary: '#E4D8DC',
          success: '#A5CCD1',
          warning: '#FECDAA',
          info: '#A3D5FF',
          error: '#EC465A',
          text: '#2C313A',
          background: '#C9CCD5'
        }
      }
    }
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  },
}
