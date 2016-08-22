module.exports = {
  context: __dirname + '/js',
  entry: './app.js',
  output: {
    path: __dirname,
    filename: 'build.js'
  },

  watch: true,

  devtool: 'source-map',

  module: {
    loaders: [
      {
        test: /\.hbs$/,
        loader: "handlebars-loader"
      }
    ]
  }
};