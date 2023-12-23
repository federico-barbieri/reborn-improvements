// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ['@nuxt/ui', "@nuxt/image", "@nuxtjs/supabase", 'nuxt-mapbox', 'nuxt-calendly'],
  supabase: {
    redirectOptions: {
      login: '/',
      callback: '/',
      exclude: [],
    }
  },
  mapbox: {
    accessToken: 'pk.eyJ1Ijoic2xvZ2FsYW5kIiwiYSI6ImNscGRjdndoMTB2NXUycXByODI3emJ3M20ifQ.T-e8tPTL8Bo3n2KeCQaWOg'
  }

 
})