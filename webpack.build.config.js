const path = require("path");

module.exports = {
  entry: path.resolve(__dirname, "src/lib/index.js"),
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "tyler-bundle.js",
    library: "$",
    libraryTarget: "umd",
  },
  mode: "development",

  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
};
