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
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src')
    }
  },
})
