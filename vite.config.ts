
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

export default defineConfig(({ mode }) => ({
  base: '/',
  server: {
    host: "::",
    port: 8080,
    allowedHosts: [
      '9d95f554-421a-4312-bcee-fd6de79c558b.lovableproject.com',
      'localhost'
    ],
    proxy: {
      '/api/itunes': {
        target: 'https://itunes.apple.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/itunes/, ''),
        secure: true
      }
    }
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
  build: {
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          // Core React chunks
          if (id.includes('react') || id.includes('react-dom')) {
            return 'vendor';
          }
          
          // Router chunk
          if (id.includes('react-router-dom')) {
            return 'router';
          }
          
          // UI components chunk
          if (id.includes('@radix-ui/react-')) {
            return 'ui';
          }
          
          // Icons chunk
          if (id.includes('lucide-react')) {
            return 'icons';
          }
          
          // Utility libraries
          if (id.includes('clsx') || id.includes('tailwind-merge') || id.includes('class-variance-authority')) {
            return 'utils';
          }
          
          // Form handling
          if (id.includes('react-hook-form') || id.includes('@hookform/resolvers')) {
            return 'forms';
          }
          
          // SEO and analytics
          if (id.includes('react-helmet-async')) {
            return 'seo';
          }
          
          // Compression and data handling
          if (id.includes('pako')) {
            return 'compression';
          }
          
          // Default chunk for other dependencies
          return 'app';
        },
      },
    },
    chunkSizeWarningLimit: 500,
    minify: 'terser',
    target: 'es2015',
    sourcemap: false,
    reportCompressedSize: false,
    modulePreload: {
      polyfill: false,
    },
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
        pure_funcs: ['console.log', 'console.info', 'console.debug', 'console.warn'],
        passes: 2,
        toplevel: false,
        unsafe: false,
        unsafe_comps: false,
        unsafe_Function: false,
        unsafe_math: false,
        unsafe_proto: false,
        unsafe_regexp: false,
        unsafe_undefined: false,
        dead_code: true,
        global_defs: {
          __REACT_DEVTOOLS_GLOBAL_HOOK__: 'undefined',
        },
      },
      mangle: {
        toplevel: false,
        safari10: true,
        reserved: ['__REACT_DEVTOOLS_GLOBAL_HOOK__', 'unstable_scheduleCallback', 'unstable_runWithPriority', 'unstable_wrapCallback'],
      },
    },
  },
  optimizeDeps: {
    include: [
      'react', 
      'react-dom', 
      'react-router-dom',
      'lucide-react',
      'clsx',
      'tailwind-merge',
      'class-variance-authority'
    ],
    exclude: ['@radix-ui/react-*'],
  },
  esbuild: {
    drop: ['console', 'debugger'],
  },
}));
