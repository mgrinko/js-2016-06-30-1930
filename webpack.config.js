module.exports = {
  context: __dirname + '/js',
  entry: './app.js',
  output: {
    path: __dirname,
    filename: 'build.js'
  },

  watch: true
};