export default {
  head: {
    titleTemplate: '%s - منصة خطوة',
    title: 'التعليم الالكتروني',
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
      { rel: 'preconnect', href: 'https://fonts.googleapis.com' }
    ]
  },

  css: [
    '@/assets/custom-icons.css',
    'vue-wysiwyg/dist/vueWysiwyg.css'
  ],

  router: {
    middleware: ['auth']
  },

  plugins: [
    '~/plugins/VueWysiwyg.js'
  ],

  server: {
    port: 2323,
    host: '0'
  },

  components: true,

  loading: '~/components/loading.vue',

  buildModules: [
    '@nuxtjs/eslint-module',
    '@nuxtjs/vuetify',
  ],

  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/toast',
    '@nuxtjs/auth-next'
  ],

  auth: {
    redirect: {
      login: '/login',
      logout: '/login',
      callback: '/login',
      home: '/'
    },
    strategies: {
      local: {
        token: {
          property: 'token',
          global: true,
          required: true,
          type: 'Bearer',
          prefix: '_token.',
        },
        user: {},
        endpoints: {
          login: { url: '/login', method: 'post' },
          logout: false,
          user: false
        }
      }
    }
  },

  axios: {
    baseURL: 'http://217.71.201.51/api/'
    // baseURL: 'http://localhost:5000/api'
    // baseURL: 'http://192.168.35.245:5100/api'
  },

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

  build: {
  },
}
