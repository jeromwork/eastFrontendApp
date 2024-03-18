// https://nuxt.com/docs/api/configuration/nuxt-config


const path = require('path');
export default defineNuxtConfig({
  devtools: { enabled: true },
  dev:false,
  modules: [
    '@vueuse/nuxt',

  ],
  yandexMetrika:      {
    id: 19981279,
    options: {
      clickmap:true,
      trackLinks:true,
      accurateTrackBounce:true,
      webvisor: true,
      ecommerce:"dataLayer"
    }
  },
  css:[
      '~/public/scss/main.scss'
  ],
  srcDir : './src',
  hooks: {
    // Run when Nuxt is in development mode
    build: {
      // Run after the main build

    },

    'pages:extend' (pages) {
      // add a route
      pages.push({
        name: 'vrachi',
        path: '/vrachi/:slug1?/:slug2?/:slug3?/:slug4?/:slug5?/:slug6?/:slug7?',//WTF??
        file: '~/pages/vrachi/index.vue',
      });
      pages.push({
        name: 'zabolevaniya',
        path: '/zabolevaniya/:slug1?/:slug2?/:slug3?/:slug4?/:slug5?/:slug6?/:slug7?',//WTF??
        file: '~/pages/vrachi/index.vue',
      });
      pages.push({
        name: 'index',
        path: '/:slug1?/:slug2?/:slug3?/:slug4?/:slug5?/:slug6?/:slug7?',//WTF??
        file: '~/pages/index.vue',
      })


    }

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
