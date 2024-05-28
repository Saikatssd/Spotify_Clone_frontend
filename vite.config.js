import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      lodash: 'lodash-es',
      'cloudinary-core': 'cloudinary-core/cloudinary-core-shrinkwrap.js', // Use the correct path
    },
  },
})

