const path = require("path");

module.exports = {
  mode: "production",

  // Enable sourcemaps for debugging webpack's output.
  // devtool: "source-map",

  entry: {
    flipping_book: path.resolve(__dirname, "build") + "/Book/"
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].js",
    libraryTarget: "commonjs2"
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".jsx"]
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        loader: "css-loader",
        enforce: "pre"
      },
      {
        test: /\.css$/,
        loader: "style-loader"
      },
      {
        test: /\.ts(x?)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "ts-loader"
          }
        ]
      }
    ]
  },
  externals: {
    react: "React",
    "react-dom": "ReactDOM"
  }
};
