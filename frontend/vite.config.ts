/**
 * @fileoverview Vite configuration for MutualMetrics frontend
 * @version 1.0.0
 * @author Software Engineer
 * @since 2025-08-20
 * @lastModified 2025-08-20
 * 
 * @description
 * Main Vite configuration for development and production builds
 * 
 * @dependencies
 * - @react-router/dev/vite
 * - @tailwindcss/vite
 * - vite-tsconfig-paths
 * 
 * @usage
 * npm run dev - Development server
 * npm run build - Production build
 * 
 * @state
 * ✅ Functional - Clean configuration for React Router v7
 * 
 * @bugs
 * - None known
 * 
 * @todo
 * - Monitor for any build optimization opportunities
 * 
 * @performance
 * - Optimized for React Router v7
 * - Tailwind CSS v4 integration
 * 
 * @security
 * - Standard Vite security practices
 */
import { reactRouter } from "@react-router/dev/vite";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [tailwindcss(), reactRouter(), tsconfigPaths()],
  server: {
    port: 5173,
    host: true
  },
  build: {
    outDir: "build/client",
    sourcemap: true
  }
});
