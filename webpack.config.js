module.exports = {
  entry: "./lib/ShopifyAPI.js",
  output: {
    filename: "./dist/shopify-api-flux.js"
  },
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
