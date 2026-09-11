import { env } from 'node:process'
import tailwindcss from '@tailwindcss/vite'

const {
  NUXT_SITE_URI,
  NUXT_PORT,
} = env

// GA4 property the Drupal site already reported to, kept so history isn't split by the
// platform switch. See README.md's "Analytics" section for the migration record.
const GA_MEASUREMENT_ID = 'G-TQT4DBDCHT'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  css: ['~/assets/css/main.css'],
  nitro: {
    // An SSR build emits no 404 page unless asked; app.conf's error_page needs one.
    prerender: { routes: ['/404.html'] },
  },
  vite: {
    plugins: [tailwindcss()],
    server: {
      allowedHosts: [
        String(NUXT_SITE_URI),
      ],
      watch: {
        usePolling: true,
      },
    },
  },
  app: {
    head: {
      title: 'Nature\'s Bounty',
      titleTemplate: '%s | Nature\'s Bounty',
      link: [
        { rel: 'icon', type: 'image/vnd.microsoft.icon', href: '/favicon.ico' },
        { rel: 'icon', type: 'image/png', sizes: '16x16', href: '/favicon-16x16.png' },
        { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/favicon-32x32.png' },
        { rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-touch-icon.png' },
        { rel: 'manifest', href: '/site.webmanifest' },
      ],
      // Prerendered into every page's head; no runtime server to inject it.
      script: [
        { src: `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`, async: true },
        {
          innerHTML: 'window.dataLayer=window.dataLayer||[];'
            + 'function gtag(){dataLayer.push(arguments)}'
            + 'gtag("js",new Date());'
            + `gtag("config","${GA_MEASUREMENT_ID}",{allow_ad_personalization_signals:false});`,
        },
      ],
    },
  },
  $development: {
    devtools: { enabled: true },
    devServer: {
      host: '0.0.0.0',
      port: Number(NUXT_PORT),
    },
    vite: {
      server: {
        ws: {
          host: String(NUXT_SITE_URI),
          port: Number(NUXT_PORT) * 10,
        },
      },
    },
  },
})
