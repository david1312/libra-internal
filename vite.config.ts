// @ts-nocheck
import { defineConfig } from "vite";
import lessToJS from "less-vars-to-js";
import react from "@vitejs/plugin-react";
import vitePluginImp from "vite-plugin-imp";
import Inspect from "vite-plugin-inspect";
import { resolve } from "path";
import fs from "fs";
import path from "path";

const themeVariables = lessToJS(
  fs.readFileSync(resolve("./src/variables/theme-variable.less"), "utf8")
);

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    Inspect(),
    react(),
    //   vitePluginImp({
    //     libList: [
    //       {
    //         libName: "antd",
    //         style: name => {
    //           if (name === "col" || name === "row") {
    //             return "antd/lib/style/index.less";
    //           }
    //           return `antd/es/${name}/style/index.less`;
    //         }
    //       }
    //     ]
    //   })
  ],
  resolve: {
    alias: [
      {
        find: "@",
        replacement: path.resolve(__dirname, "src"),
      },
    ],
  },
  css: {
    preprocessorOptions: {
      less: {
        javascriptEnabled: true,
        modifyVars: themeVariables,
      },
    },
  },
});
