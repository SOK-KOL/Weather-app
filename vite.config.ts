import { defineConfig } from "vite";
import react, { reactCompilerPreset } from "@vitejs/plugin-react";
import babel from "@rolldown/plugin-babel";
import svgr from "vite-plugin-svgr";

// https://vite.dev/config/
export default defineConfig({
  base: '/Weather-app/', 
  
  server: {
    headers: {
       'Content-Security-Policy': "default-src 'self'; connect-src 'self' https://openweathermap.org; img-src 'self' https://openweathermap.org; style-src 'self' 'unsafe-inline';",
      'X-Frame-Options': 'SAMEORIGIN'
    }
  },
  plugins: [
    react(),
    babel({ presets: [reactCompilerPreset()] }),
    svgr({
      svgrOptions: {
        icon: true,
      },
    }),
  ],
});
