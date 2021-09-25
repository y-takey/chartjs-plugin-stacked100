const path = require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin');

const commonConfig = require("./common.config");

module.exports = (env, args) => {
  const isProduction = args && args.mode === "production";

  return {
    ...commonConfig,
    devtool: isProduction && "source-map",
    entry: "./examples/demo/index.ts",
    output: {
      path: path.resolve("./demo"),
      filename: "index.js"
    },
    optimization: {
      minimize: isProduction,
    },
    devServer: {
      open: true,
      hot: true,
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: "./examples/demo/index.html",
        publicPath: "./",
        hash: true,
      }),
    ],
  };
};
