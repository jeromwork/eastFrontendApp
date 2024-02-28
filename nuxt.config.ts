// https://nuxt.com/docs/api/configuration/nuxt-config

const path = require('path');
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    '@vueuse/nuxt',

  ],
  css:[
      '~/public/scss/main.scss'
  ],
  srcDir : './src',
  hooks: {
    // Run when Nuxt is in development mode
    build: {
      // Run after the main build

    },
  },
  // asyncContext:true,
ssr:false,
  sourcemap: {
    server: true,
    client: true
  },
  router: {
    // Customize the Vue Router options
    // For example, you can set the 'history' mode to true or false
    // to enable or disable HTML5 history mode
    // More options: https://router.vuejs.org/api/#options
    // options: {
    //   history:{createRouter({
    //                           history: createWebHistory(),
    // })}
    // },

    // Additional router options...
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src')
    }
  },
})
