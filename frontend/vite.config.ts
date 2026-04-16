import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import stylex from '@stylexjs/unplugin'

export default defineConfig({
    plugins: [
        stylex.vite({
            dev: true,
            runtimeInjection: false,
            unstable_moduleResolution: { type: 'commonJS', rootDir: __dirname },
        }),
        react(),
    ],
})
