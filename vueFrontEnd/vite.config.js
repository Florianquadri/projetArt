import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  base: '/app/',
})

/* import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
export default defineConfig(({ command, mode }) => {
  const config = {
    plugins: [vue({})],
    base: ''
  };
  // define specific env configuration
  if (mode === 'development') {
    config.server = {
      proxy : {
        '/api': { // ici il  faudra mettre le prefix des routes du backend
          target: 'https://abe-pingouin.heig-vd.ch/api', // à remplacer par l'url du back (donc 127.0.0.1:port_ici ou Pingouin)
          changeOrigin: true,
          rewrite: path => path.replace(/^\/api\//, '')
        }
      }
    }
  }
  return config;
}); */