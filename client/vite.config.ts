import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/

export default defineConfig(({mode}) => {
  const env = loadEnv(mode, process.cwd(), '');
  return {
    server: {
      port: env.PORT ? Number(env.PORT) : 5173,
      hmr: true,
      open: true,
    },
    plugins: [
      react(),
    ],
    resolve: {
      extensions: ['.js', '.jsx', '.ts', '.tsx'], // add .jsx explicitly
    },
  };
})
