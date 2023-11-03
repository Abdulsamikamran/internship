import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      input: "index.html", // Adjust the path to your index.html
    },
  },
  start: {
    rollupOptions: {
      input: "index.html", // Adjust the path to your index.html
    },
  },
});
