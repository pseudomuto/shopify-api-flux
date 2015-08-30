var webpack = require("webpack");

module.exports = {
  entry: "./lib/ShopifyAPI.js",
  output: {
    filename: "./dist/shopify-api-flux.js",
    library: "ShopifyAPI",
    libraryTarget: "commonjs2"
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin({minimize: true})
  ],
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel-loader?stage=0"
      }
    ]
  }
};
