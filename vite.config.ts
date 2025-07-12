
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  // Ensure dotfiles and .well-known directory are copied to build
  publicDir: 'public',
  build: {
    rollupOptions: {
      // Ensure all files in public are copied, including dotfiles
      external: [],
    },
  },
});
