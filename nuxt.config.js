import colors from 'vuetify/es5/util/colors'

export default {
  // Target (https://go.nuxtjs.dev/config-target)
  target: 'static',

  mode: 'spa',

  ssr: false,



  // Global page headers (https://go.nuxtjs.dev/config-head)
  head: {
    titleTemplate: '%s',
    title: 'RedGlee Delivery',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

//remove thai activate author

  router: {
    middleware: ['auth']
  },
  

  // Global CSS (https://go.nuxtjs.dev/config-css)
  css: [
  ],

  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  plugins: [
    { src: "~/plugins/maps",ssr:false},
    { src: "~/plugins/vue_socket",ssr:false},
    { src: "~/plugins/image_plugin"},
    { src: "~/plugins/phone_number_input"},
    { src: "~/plugins/date_time_plugin"},
    { src: "~/plugins/vue_date"},
    { src: "~/plugins/vue_chat",ssr:false},
    //{ src: "~/plugins/vue_image_upload",ssr:false},
  ],

  // Auto import components (https://go.nuxtjs.dev/config-components)
  components: true,

  // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
  buildModules: [
    // https://go.nuxtjs.dev/vuetify
    '@nuxtjs/vuetify',

  ],

  // Modules (https://go.nuxtjs.dev/config-modules)
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    // https://go.nuxtjs.dev/pwa
    //'@nuxtjs/pwa',
    '@nuxtjs/auth',
    '@nuxtjs/toast',
    'nuxt-clipboard2',
    //'nuxt-socket-io',
  ],

  socket_io_url:"https://172.105.58.4/socket.io",
  io: {
    // module options
    sockets: [{
      name: 'main',
      url: 'https://172.105.58.4',
      
    }]
  },



toast: {
    position: 'top-right',
    iconPack:'mdi',
    keepOnHover:true,
    duration:4000
    
},


  auth: {
    strategies: {
      local: {
        endpoints: {
          login: { url: '/api/user/login', method: 'post', propertyName: 'token' },
          logout: { url: '/api/auth/logout', method: 'post' },
          user: { url: '/api/auth/user', method: 'get', propertyName: 'user' }
        },
       tokenType: '',
      }
    },
    redirect: {
      login: '/login',
      logout: '/login',
      callback: false,
      home: '/'
    },
    watchLoggedIn:true,
    
  },

  // Axios module configuration (https://go.nuxtjs.dev/config-axios)
  axios: {
    baseURL: 'https://172.105.58.4',

  },

  // Vuetify module configuration (https://go.nuxtjs.dev/config-vuetify)
  vuetify: {
    //customVariables: ['~/assets/variables.scss'],
    icons: {
      iconfont: 'mdi',
    },
    theme: {
      dark:false,
      themes: {
        light: {
          primary: "#F31212",
          accent: colors.grey.lighten3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3
        },
        dark: {
          primary: "#F31212",
          accent: colors.grey.lighten3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3
        }
      }
    }
  },

  // Build Configuration (https://go.nuxtjs.dev/config-build)
  build: {
    transpile: [/^gmap-vue($|\/)/,'@nuxtjs/auth'],
    styleResources:false
  }
}
