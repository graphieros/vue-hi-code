import { defineConfig } from "vite";
import { copyFileSync } from 'node:fs'
import { resolve } from "path";
import vue from "@vitejs/plugin-vue";

const prod = process.env.NODE_ENV === 'production';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    {
      name: "copy-readme", // Custom plugin to copy README.md
      apply: "build",
      closeBundle() {
        const source = resolve(__dirname, "README.md");
        const destination = resolve(__dirname, "dist/README.md");
        copyFileSync(source, destination);
        console.log("README.md copied to dist/");
      },
    },
  ],
  build: {
    lib: {
      // src/indext.ts is where we have exported the component(s)
      entry: resolve(__dirname, "src/index.js"),
      name: "VueHiCode",
      // the name of the output files when the build is run
      fileName: "vue-hi-code",
      formats: ['es', 'cjs']
    },
    rollupOptions: {
      // make sure to externalize deps that shouldn't be bundled
      // into your library
      external: ["vue", "vue-hi-code"],
      output: {
        // Provide global variables to use in the UMD build
        // for externalized deps
        globals: {
          vue: "Vue",
        },
      },
    },
    types: [
      {
        declarationDir: "dist/types",
        root: resolve(__dirname, "types"),
        entry: "vue-hi-code.d.ts",
      },
    ],
  },
});
