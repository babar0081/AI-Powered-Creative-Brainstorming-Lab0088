// import { defineConfig } from 'vite'
// import tailwindcss from '@tailwindcss/vite'
// import react from '@vitejs/plugin-react'
// export default defineConfig({
//   plugins: [
//     tailwindcss(),
//   ],
// })

import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
export default defineConfig({
  plugins: [
    tailwindcss(),
    react(),
  ],
})

// import { defineConfig } from 'vite'
// import tailwindcss from '@tailwindcss/vite'
// import react from '@vitejs/plugin-react' // React plugin ko import karein

// export default defineConfig({
//   plugins: [
//     react(), // React plugin ko yahan shamil karein
//     tailwindcss(),
//   ],
// })