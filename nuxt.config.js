import baseURL from './endpoints/baseUrl'
export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  target: 'static',
  head: {
    title:
      'Buzzle: Sell and Redeem Gift Cards For Naira - 100% \nReliable-Trusted-Effictent-convenient Platform',
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
      login: '/login',
      logout: '/login',
      // callback: false,
      home: '/',
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
          data: 'refreshToken',
          // maxAge: 60 * 60 * 24 * 30,
        },
        user: {
          property: 'user',
          // autoFetch: false,
        },
        endpoints: {
          login: { url: 'auth/login', method: 'post' },
          refresh: { url: 'auth/refresh-tokens', method: 'post' },
          user: { url: 'auth/user', method: 'get' },
          logout: { url: 'auth/logout', method: 'post' },
        },
      },
    },
  },
  router: {
    middleware: ['auth'],
    /*
     ** Router configuration
     */

    scrollBehavior: async (to, from, savedPosition) => {
      if (savedPosition) {
        return savedPosition
      }

      const findEl = (hash, x) => {
        return (
          document.querySelector(hash) ||
          new Promise((resolve, reject) => {
            if (x > 50) {
              return resolve()
            }
            setTimeout(() => {
              resolve(findEl(hash, ++x || 1))
            }, 100)
          })
        )
      }

      if (to.hash) {
        const el = await findEl(to.hash)
        if ('scrollBehavior' in document.documentElement.style) {
          return window.scrollTo({ top: el.offsetTop, behavior: 'smooth' })
        } else {
          return window.scrollTo(0, el.offsetTop)
        }
      }

      return { x: 0, y: 0 }
    },
  },
  loadingIndicator: {
    name: 'fading-circle',
    color: '#fff',
    background: '#39f',
  },
  // loadingIndicator: '~/components/loading.vue',
  loading: {
    color: 'white',
  },
  ssr: false,
  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: { baseURL },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},
  server: {
    port: 4001, // default: 3000
    host: '0.0.0.0', // default: localhost,
    timing: false,
  },
}
