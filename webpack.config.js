const webpck = require("webpack");
const path = require("path");

module.exports = {
  context: __dirname,
  entry: `${__dirname}/src/js/index.js`,
  output: {
    filename: "bundle.js",
    path: path.join(__dirname, "dist")
  },
  module: {
    rules: [
      {
        test: /\.hbs$/,
        loader: "handlebars-loader"
      },
      {
        test: /\.js$/,
        use: "babel-loader"
      },
      {
        test: /\.css$/,
        use: [
          "style-loader",
          "css-loader"
        ]
      },
      {
        test: /\.json$/,
        use: "json-loader"
      }
    ]
  }
}
