const path = require('path');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { DefinePlugin } = require("webpack");
const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");
const Dotenv = require('dotenv-webpack');

// To prevent argv being undefined, let's use a default value
module.exports = (env = {}, argv = {}) => {
  let envPath = '.env';
  if (env.dev) {
    envPath = '.env.dev';
  } else if (env.qa) {
    envPath = '.env.qa';
  } else if (env.stg) {
    envPath = '.env.stg';
  } else if (env.prod) {
    envPath = '.env.prod';
  }

  return {
    entry: './src/index.js',
    output: {
      path: path.join(__dirname, '/build'),
      filename: 'main.js',
      publicPath: '/', // allows you to specify the base path for all the assets within your application
    },
    devServer: {
      inline: true,
      port: 3002,
      historyApiFallback: true, // will redirect 404s to /index.html
    },
    devtool: "source-map", // allow easy debugging in source tree in console
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: 'babel-loader'
        },
        {
          test: /\.(gif|png|jpe?g|svg|ico)$/i,
          loader: 'file-loader',
          options: {
            name: '[path][name].[ext]',
          }
        },
        {
          test: /\.(ogg|mp3|wav|mpe?g)$/i,
          use: 'file-loader'
        },
        {
          test: /\.(scss|css)$/i,
          use: [
            argv.mode === "production"
              ? MiniCssExtractPlugin.loader // minify and provide as a single optimized file
              : "style-loader",
            {
              loader: "css-loader",
              options: {
                sourceMap: true
              }
            },
            {
              loader: "sass-loader",
              options: {
                sourceMap: true
              }
            }
          ]
        },
        {
          test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
          use: [
            {
              loader: 'file-loader',
              options: {
                name: '[name].[ext]',
                outputPath: 'fonts/'
              }
            }
          ]
        }
      ]
    },
    plugins: [
      // Any option given to Webpack client can be captured on the "argv"
      // generate an HTML5 file for you that includes all your webpack bundles in the body using script tags.
      argv.mode === "development" ? new HtmlWebpackPlugin({
        template: path.join(__dirname, 'src', 'index.html'),
        manifest: "./src/manifest.json",
        favicon: "./src/images/favicon.ico"
      }) : null,
      argv.mode === "production"
        ? new MiniCssExtractPlugin({
          filename: "[name].css",
          chunkFilename: "[id].css"
        })
        : null,
      env.analyse ? new BundleAnalyzerPlugin() : null, // will help you identify output files that take up the most space
      new DefinePlugin({
        "process.env": {
          NODE_ENV: JSON.stringify(argv.mode)
        }
      }),
      new Dotenv({
        path: envPath,
        safe: true,
      })
    ].filter(
      // To remove any possibility of "null" values inside the plugins array, we filter it
      plugin => !!plugin
    )
  }
};
