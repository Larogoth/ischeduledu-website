
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

export default defineConfig(({ mode }) => ({
  base: mode === 'development' ? '/' : '/ischeduledu-website/',
  server: {
    host: "::",
    port: 8080,
    allowedHosts: [
      '9d95f554-421a-4312-bcee-fd6de79c558b.lovableproject.com',
      'localhost'
    ]
  },
  plugins: [
    react(),
    mode === 'development' &&
    componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
