const merge = require("webpack-merge");
const baseConfig = require("./webpack.config.base");
const path = require("path");

const config = {
  mode: "development",
  entry: "./src/client/index.js",
  output: {
    filename: "bundle.js",
    chunkFilename: "[id].js",
    path: path.resolve(__dirname, "public"),
    publicPath: "/"
  }
};

module.exports = merge(baseConfig, config);
