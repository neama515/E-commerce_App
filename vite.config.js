import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";




export default defineConfig({
  plugins: [react()],
  base: process.env.NODE_ENV === "production" ? "/E-commerce_App/" : "/",
  server: {
    historyApiFallback: true,
  },
});
