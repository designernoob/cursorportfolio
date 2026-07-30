import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    // Bind on all interfaces so Cursor's cloud port-forward can attach.
    host: "0.0.0.0",
    // Always use this exact port. strictPort makes Vite fail loudly if
    // the port is taken instead of silently jumping to 5174 (which is
    // what causes the Browser pane to point at the wrong/empty port).
    port: 5173,
    strictPort: true,
    // Cursor Browser reaches the agent via a localhost tunnel. Without
    // this, Vite's HMR client tries the container IP and the page can
    // sit on a spinner forever waiting for the websocket.
    hmr: {
      protocol: "ws",
      host: "localhost",
      port: 5173,
      clientPort: 5173,
    },
    watch: {
      usePolling: true,
    },
  },
  preview: {
    host: "0.0.0.0",
    port: 4173,
    strictPort: true,
  },
});
