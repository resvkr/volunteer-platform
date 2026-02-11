import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import stylex from '@stylexjs/unplugin'

// https://vite.dev/config/
export default defineConfig({
    plugins: [
        stylex.vite({
            // Якщо помилка не зникає, додайте ці базові параметри:
            dev: true,
            runtimeInjection: false,
            unstable_moduleResolution: { type: 'commonJS', rootDir: __dirname },
        }),
        react(),
    ],
})
