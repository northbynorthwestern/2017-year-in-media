const path = require("path");

const config = {
  entry: "./src/",
  output: {
    filename: "bundle.js",
    path: path.join(__dirname, "dist")
  }
}
