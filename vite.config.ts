import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    // Always use this exact port. strictPort makes Vite fail loudly if
    // the port is taken instead of silently jumping to 5174 (which is
    // what causes the Browser pane to point at the wrong/empty port).
    port: 5173,
    strictPort: true,
    host: true,
  },
  preview: {
    port: 4173,
    strictPort: true,
  },
});
