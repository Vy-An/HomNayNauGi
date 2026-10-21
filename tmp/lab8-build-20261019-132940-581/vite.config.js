import { defineConfig } from "vite";

export default defineConfig({
    publicDir: false,
    build: {
        outDir: "dist",
        emptyOutDir: true,
        minify: true,
        rollupOptions: {
            input: {
                laptop_ds: "public/js/laptop_ds.js",
                laptop_them: "public/js/laptop_them.js",
                laptop_sua: "public/js/laptop_sua.js"
            },
            output: {
                entryFileNames: "[name].js",
                chunkFileNames: "chunks/[name]-[hash].js"
            }
        }
    }
});
