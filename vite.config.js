// import { resolve } from "path";
import { defineConfig } from "vite";

export default defineConfig({
  root: "src/",

  build: {
    outDir: "../dist",
    rollupOptions: {
      input: {
        main: 'index.html',
        // cart: resolve(__dirname, "src/chat/index.html"),
        chat: 'chat/index.html',
        // product: resolve(__dirname, "src/product_pages/index.html"),
        // product_listing: resolve(__dirname, "src/product_listing/index.html"),
      },
    },
  },
});
