const path = require('path');
const PrettierPlugin = require("prettier-webpack-plugin");
const TerserPlugin = require('terser-webpack-plugin');

const commonConfig = require("./common.config");

module.exports = {
  ...commonConfig,
  mode: "production",
  devtool: false,
  entry: './src/plugin/index.ts',
  output: {
    filename: 'index.js',
    path: path.resolve('./build'),
    library: "chartjs-plugin-stacked100",
    libraryTarget: 'umd',
    clean: true
  },
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({ extractComments: false }),
    ],
  },
  plugins: [
    new PrettierPlugin(),
  ],
};
