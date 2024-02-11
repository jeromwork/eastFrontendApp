// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    '@vueuse/nuxt',
  ],
  css:[
      '~/public/styles/main.css'
  ],
  hooks: {
    // Run when Nuxt is in development mode
    build: {
      // Run after the main build
      after() {
        // Use the useEffect hook to inject the Vue 3 app
        this.useEffect(() => {
          // Create a script element
          const script = document.createElement('script');
          script.src = 'http://127.0.0.1:8000/vendors/assets/index-QLXDFMLX.js'; // Path to your build.js file
          script.defer = true;

          // Append the script element to the document body
          document.body.appendChild(script);
        });
      },
    },
  },
})
