var webpack = require('webpack');

module.exports = {
  context: __dirname + "/client",
  entry: [
    'webpack-dev-server/client?http://0.0.0.0:3001', // WebpackDevServer host and port
    'webpack/hot/only-dev-server',
    "./js/main.js"
  ],
  output: {
    filename: "./js/bundle.js",
    path: __dirname + "/client",
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loaders: ["react-hot", "babel-loader"],          
      }
    ],
  },
  resolve: {
    alias: {      
      jquery: __dirname + "/client/js/lib/jquery/dist/jquery.js"
    }
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.ProvidePlugin({
        $: "jquery",
        jQuery: "jquery"
    })
  ]
}