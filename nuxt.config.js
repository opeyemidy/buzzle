import baseURL from './endpoints/baseUrl'
export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'buzzle',
    htmlAttrs: {
      lang: 'en',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: 'buzzle giftcard',
      },
      { name: 'format-detection', content: 'telephone=no' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css

  css: ['~/assets/scss/style'],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    { src: '~/plugins/coreui', mode: 'client' },
    { src: '~/plugins/charts', mode: 'client' },
    { src: '~/plugins/veevalidate', mode: 'client' },
    '~/plugins/requests',
    '~/plugins/toast',
    '~/mixin',
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    '@nuxtjs/auth-next',
    // '@coreui/icons',
    // 'nuxt-buefy',
  ],
  auth: {
    localStorage: false,
    // redirect: false,
    redirect: {
      login: '/',
      logout: '/',
      callback: false,
      home: false,
    },
    strategies: {
      local: {
        scheme: 'refresh',
        token: {
          property: 'tokens.access.token',
          // maxAge: 1800,
          global: true,
          // type: 'Bearer'
        },
        refreshToken: {
          property: 'tokens.refresh.token',
          data: 'token',
          // maxAge: 60 * 60 * 24 * 30,
        },
        user: {
          property: 'user',
          // autoFetch: true,
        },
        endpoints: {
          login: { url: 'auth/login', method: 'post' },
          logout: false, // { url: 'auth/logout', method: 'post' },
          user: { url: 'auth/user', method: 'get' },
        },
      },
    },
  },
  router: {
    middleware: ['auth'],
  },
  loading: {
    color: 'white',
  },
  ssr: false,
  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: { baseURL },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},
  server: {
    host: '0', // default: localhost
  },
}
