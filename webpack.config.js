const path = require("path"); 
const HtmlWebPackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const WorkboxPlugin = require("workbox-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const ENV = {
  dev: "development",
  prod: "production"
};

const plugins = {
  [ENV.dev]: [],
  [ENV.prod]: [
    new MiniCssExtractPlugin({
      filename: "[name].css",
      chunkFilename: "[id].css"
    }),
    new WorkboxPlugin.GenerateSW()
  ]
};

const styles = {
  [ENV.dev]: ["style-loader", "css-loader", "sass-loader"],
  [ENV.prod]: [
    "style-loader",
    MiniCssExtractPlugin.loader,
    "css-loader",
    "sass-loader"
  ]
};

module.exports = (env = ENV.dev) => ({
  devServer: {
    host: "localhost",
    port: "3000",
    proxy: [
      {
        context: ["/article", "/api"],
        target: "http://localhost:8000"
      }
    ],
    hot: true,
    overlay: true,
    headers: {
      "Access-Control-Allow-Origin": "*"
    },
    historyApiFallback: true
  },
  mode: env,
  entry: "./src/client/index.js",
  output: {
    path: path.join(__dirname, "dist"),
    filename: "bundle-[hash].min.js",
    libraryTarget: "var",
    library: "Client"
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel-loader"
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: styles[env]
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin({ verbose: true }),
    new HtmlWebPackPlugin({
      template: "./src/client/views/index.html",
      hash: true,
      xhtml: true
    })
  ].concat(plugins[env])
});
