import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// This site makes no backend calls, so there is no /api proxy.
// base: '/' assumes deployment to the user site (guptaumang769.github.io).
// change to '/portfolio-site/' if deploying as a project site.
export default defineConfig({
  base: '/',
  plugins: [react()],
  server: {
    port: 5179,
  },
});
