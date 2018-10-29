const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  devtool: "cheap-module-eval-source-map",
  module: {
    rules: [
      {
        test: /\.js?$/,
        loader: "babel-loader",
        exclude: /node_modules/
      },
      {
        oneOf: [
          {
            test: /\.css$/,
            resourceQuery: /^\?raw$/,
            use: [MiniCssExtractPlugin.loader, "css-loader"]
          },
          {
            test: /\.(sa|sc|c)ss$/,
            use: [
              MiniCssExtractPlugin.loader,
              {
                loader: "css-loader",
                options: {
                  importLoaders: 1,
                  modules: true,
                  localIdentName: "[name]__[local]--[hash:base64:5]"
                }
              },
              {
                loader: "postcss-loader",
                options: {
                  plugins: [
                    require("autoprefixer")({
                      browsers: ["> 1%", "last 2 versions"]
                    })
                  ]
                }
              },
              { loader: "sass-loader" }
            ]
          }
        ]
      },
      {
        test: /\.(woff(2)?|ttf|eot)(\?v=\d+\.\d+\.\d+)?$/,
        use: [
          {
            loader: "url-loader",
            options: {
              name: "[name].[ext]",
              outputPath: "fonts/"
            }
          }
        ]
      },
      {
        test: /\.(svg|jpg|jpeg|gif)$/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "[name].[ext]",
              outputPath: "images/"
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "[name].css",
      chunkFilename: "[id].css"
    })
  ]
};
