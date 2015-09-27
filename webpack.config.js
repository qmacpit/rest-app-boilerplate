module.exports = {
  context: __dirname + "/client",
  entry: {
    javascript: "./js/main.js",
    // html: "./index.html",
  },
  output: {
    filename: "./js/boundle.js",
    path: __dirname + "/client",
  },
  module: {
      loaders: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          loaders: ["react-hot", "babel-loader"],          
        },
        // {
        //   test: /\.html$/,
        //   loader: "file?name=[name].[ext]",
        // }
      ],
    },
}