// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    '@vueuse/nuxt',
  ],
  css:[
      '~/public/scss/main.scss'
  ],
  hooks: {
    // Run when Nuxt is in development mode
    build: {
      // Run after the main build

    },
  },
})
