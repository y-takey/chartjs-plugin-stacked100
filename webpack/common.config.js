module.exports = {
  module: {
    rules: [
      {
        test: /\.(js|ts)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "ts-loader",
            options: {
              transpileOnly: true,
              silent: true,
            },
          },
        ],
      },
    ]
  },
  resolve: {
    extensions: ['.ts', '.js', '.json']
  }
};
