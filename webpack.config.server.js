const externals = require("webpack-node-externals");
const merge = require("webpack-merge");
const baseConfig = require("./webpack.config.base");
const path = require("path");

const config = {
  mode: "development",
  entry: "./src/server/index.js",
  target: "node",
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "build"),
    publicPath: "/"
  },
  externals: [externals()]
};

module.exports = merge(baseConfig, config);
