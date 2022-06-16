/* import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  base: '/app/',
})
 */

/* import { VitePWA } from 'vite-plugin-pwa'

export default {
  plugins: [
    VitePWA()
  ]
} */
import { VitePWA } from 'vite-plugin-pwa'
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
export default defineConfig(({ command, mode }) => {
  const config = {
    plugins: [vue({}),VitePWA({  
     
            includeAssets: ['favicon.svg', 'favicon.ico', 'robots.txt', 'apple-touch-icon.png'],
            manifest: {
              name: 'Abe - Horraire',
              short_name: 'Abe',
              description: 'Apllication horraire pour ingenierie media',
              theme_color: '#ffffff',
              icons: [
                {
                  src: 'pwa-192x192.png',
                  sizes: '192x192',
                  type: 'image/png',
                },
                {
                  src: 'pwa-512x512.png',
                  sizes: '512x512',
                  type: 'image/png',
                },
                {
                  src: 'pwa-512x512.png',
                  sizes: '512x512',
                  type: 'image/png',
                  purpose: 'any maskable',
                }
              ]
            }
          })
        ]
,
    base: ''
  };
  // define specific env configuration
  if (mode === 'development') {
    config.server = {
      proxy : {
        '/api': { // ici il  faudra mettre le prefix des routes du backend
          target: 'https://abe-pingouin.heig-vd.ch', // à remplacer par l'url du back (donc 127.0.0.1:port_ici ou Pingouin)
          changeOrigin: true,
          rewrite: path => path.replace(/^\/api\//, '')
        }
      }
    }
  }
  return config;
});