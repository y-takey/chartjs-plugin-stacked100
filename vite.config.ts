import { defineConfig } from "vite";
// import react from '@vitejs/plugin-react';
// import path from 'path';
const path = require("path");

export default defineConfig({
  // plugins: [react()],
  build: {
    outDir: "dist",
    lib: {
      entry: path.resolve(__dirname, "src/index.ts"),
      name: "ChartjsPluginStacked100",
      // fileName: "index.js",
      fileName: () => `index.js`,
      // fileName: (format) => `chartjs-plugin-stacked100.${format}.js`,
      formats: ["umd"],
      // formats: ['umd', 'es'],
    },
    rollupOptions: {
      external: ["chart.js"],
      // external: ['react', 'react-dom', 'chart.js'],
      output: {
        globals: {
          // react: 'React',
          // 'react-dom': 'ReactDOM',
          "chart.js": "Chart",
        },
      },
    },
  },
  // server: {
  //   port: 3000,
  // },
});
