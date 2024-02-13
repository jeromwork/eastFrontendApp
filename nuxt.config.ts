import vuetify, { transformAssetUrls } from 'vite-plugin-vuetify'

// https://nuxt.com/docs/api/configuration/nuxt-config

export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    '@vueuse/nuxt',
    (_options, nuxt) => {
      nuxt.hooks.hook('vite:extendConfig', (config) => {
        // @ts-expect-error
        config.plugins.push(vuetify({ autoImport: true }))
      })
    },
  ],
  css:[
      '~/public/scss/main.scss'
  ],
  ssr: true,
  hooks: {
    // Run when Nuxt is in development mode
    build: {
      // Run after the main build
      transpile: ['vuetify'],
    },
  },
  components: [
    {
      path: '~/components',
      // pathPrefix: false,
    },
  ],
})
