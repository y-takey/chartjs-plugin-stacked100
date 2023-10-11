const path = require("path");
const TerserPlugin = require("terser-webpack-plugin");

const commonConfig = require("./common.config");

module.exports = {
  ...commonConfig,
  mode: "production",
  devtool: false,
  entry: "./src/index.ts",
  output: {
    filename: "index.js",
    path: path.resolve("./build"),
    library: "ChartjsPluginStacked100",
    libraryTarget: "umd",
    clean: true,
  },
  optimization: {
    minimize: true,
    minimizer: [new TerserPlugin({ extractComments: false })],
  },
};
