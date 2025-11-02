import { VitePWA } from 'vite-plugin-pwa';
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite';

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    allowedHosts:[ 'xmas25.loca.lt'],    
  },
  preview: {
    allowedHosts:[ 'xmas25.loca.lt'],    
    port: 5555
  },
  plugins: [
    vue(), 
    tailwindcss(),
    VitePWA({
    registerType: 'autoUpdate',
    injectRegister: 'script',
    includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'pwa-192-192.png', 'pwa-512-512.png'],

    pwaAssets: {
      disabled: false,
      config: true,
    },

    manifest: {
      name: 'XMas25',
      short_name: 'XMas25',
      description: 'Berechnet die Getränkepreise für den Weihnachtsmarkt',
      theme_color: '#ffffff',
      icons: [
        {
          src: 'pwa-192-192.png',
          sizes: '192x192',
          type: 'image/png',
        },
        {
          src: 'pwa-512-512.png',
          sizes: '512x512',
          type: 'image/png',
        },
      ],
    },

    workbox: {
      globPatterns: ['**/*.{js,css,html,svg,png,ico,ts}'],
      cleanupOutdatedCaches: true,
      clientsClaim: true,
    },

    devOptions: {
      enabled: false,
      navigateFallback: 'index.html',
      suppressWarnings: true,
      type: 'module',
    },
  })],
})