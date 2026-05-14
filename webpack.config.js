require("./postcss.config");

const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const FriendlyErrorsWebpackPlugin = require('@soda/friendly-errors-webpack-plugin');
const utils = require("./utils");
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');
const ImageMinimizerPlugin = require("image-minimizer-webpack-plugin");

module.exports = (env) => {
  const MODE = env.mode || "production";
  return {
    mode: MODE,
    stats: 'errors-warnings',
    performance: {
      hints: false,
      maxEntrypointSize: 512000,
      maxAssetSize: 512000
    },
    target: "web",
    devtool: utils.isDevMode(MODE) ? "eval-source-map" : 'source-map',
    context: path.join(__dirname, "./src"),
    entry: {
      bundle: path.join(__dirname, "./src/bundle.js"),
      app: "./assets/styles/app.scss",
      fonts: "./assets/styles/base/fonts.scss",
      global: "./assets/styles/base/global.scss",
      prioritycolors: "./assets/styles/base/priority-colors.scss",
      statuscolors: "./assets/styles/base/status-colors.scss",
      variables: "./assets/styles/base/variables.scss",
      daterangepicker: "./assets/styles/daterangepicker.css",
      breadcrumbs: "./assets/styles/mixins/breadcrumbs.scss",
      breakpoints: "./assets/styles/mixins/breakpoints.scss",
      button: "./assets/styles/mixins/button.scss",
      dropdown: "./assets/styles/mixins/dropdown.scss",
      headingtable: "./assets/styles/mixins/heading-table.scss",
      heading: "./assets/styles/mixins/heading.scss",
      input: "./assets/styles/mixins/input.scss",
      search: "./assets/styles/mixins/search.scss",
      widget: "./assets/styles/mixins/widget.scss",
      accordion: "./assets/styles/components/accordion.scss",
      advertisinggroup: "./assets/styles/components/advertising-group.scss",
      bills: "./assets/styles/components/bills.scss",
      calendar: "./assets/styles/components/calendar.scss",
      campaign: "./assets/styles/components/campaign.scss",
      chat: "./assets/styles/components/chat.scss",
      contentasidefeed: "./assets/styles/components/content-aside-feed.scss",
      contentaside: "./assets/styles/components/content-aside.scss",
      content: "./assets/styles/components/content.scss",
      errorpage: "./assets/styles/components/error-page.scss",
      filter: "./assets/styles/components/filter.scss",
      header: "./assets/styles/components/header.scss",
      infousers: "./assets/styles/components/info-users.scss",
      login: "./assets/styles/components/login.scss",
      logo: "./assets/styles/components/logo.scss",
      messages: "./assets/styles/components/messages.scss",
      pagination: "./assets/styles/components/pagination.scss",
      popup: "./assets/styles/components/popup.scss",
      post: "./assets/styles/components/post.scss",
      posts: "./assets/styles/components/posts.scss",
      profile: "./assets/styles/components/profile.scss",
      selector: "./assets/styles/components/selector.scss",
      sidebar: "./assets/styles/components/sidebar.scss",
      table: "./assets/styles/components/table.scss",
      uploadalert: "./assets/styles/components/upload-alert.scss",
      users: "./assets/styles/components/users.scss",
      widgets: "./assets/styles/components/widgets.scss",
    },
    output: {
      publicPath: '/',
      path: path.join(__dirname, "./build"),
      filename: "assets/js/[name].[contenthash:7].bundle.js",
    },
    devServer: {
      static: path.join(__dirname, "/src"),
      compress: true,
      liveReload: false,
      hot: true,
      port: 8081,
      client: {
        logging: 'error'
      },
    },
    module: {
      rules: [
        {
          test: /\.m?js$/,
          exclude: [/node_modules/],
          use: [
            {
              loader: "babel-loader",
              options: { presets: ["@babel/preset-env"] },
            },
          ],
        },
        {
          test: /\.css$/,
          use: [
            MiniCssExtractPlugin.loader, // Убрали условие - всегда используем MiniCssExtractPlugin
            {
              loader: "css-loader",
              options: {
                importLoaders: 1,
                sourceMap: true,
              },
            },
          ],
        },
        {
          test: /\.scss$/,
          use: [
            MiniCssExtractPlugin.loader, // Убрали условие - всегда используем MiniCssExtractPlugin
            {
              loader: "css-loader",
              options: { importLoaders: 1, sourceMap: true },
            },
            "postcss-loader",
            "sass-loader",
          ],
        },
        {
          test: /\.pug$/,
          use: [
            utils.isDevMode(MODE)
            ? {
              loader: "@webdiscus/pug-loader"
            } : {
              loader: "pug-loader",
              options: {
                pretty: true
              }
            },
          ],
        },
        {
          test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
          type: "asset/resource",
          generator: {
            filename: "assets/videos/[name].[contenthash:7][ext]",
          },
        },
        {
          test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
          type: "asset/resource",
          generator: {
            filename: "assets/fonts/[name].[contenthash:7][ext]",
          },
        },
        {
          test: /\.(jpe?g|png|gif|svg)$/i,
          type: "asset/resource",
        },
      ],
    },
    experiments: {
      topLevelAwait: true,
    },
    optimization: {
      minimize: false,
      minimizer: [
        new TerserPlugin({
          parallel: true,
        }),
        new CssMinimizerPlugin(),
        new ImageMinimizerPlugin({
          minimizer: {
            implementation: ImageMinimizerPlugin.imageminMinify,
            options: {
              plugins: [
                ["gifsicle", { interlaced: true }],
                ["imagemin-mozjpeg", { progressive: true }],
                ["imagemin-pngquant", { optimizationLevel: 5 }],
                [
                  "svgo",
                  {
                    plugins: [
                      {
                        name: "preset-default",
                        params: {
                          overrides: {
                            removeViewBox: false,
                            addAttributesToSVGElement: {
                              params: {
                                attributes: [
                                  { xmlns: "http://www.w3.org/2000/svg" },
                                ],
                              },
                            },
                          },
                        },
                      },
                    ],
                  },
                ],
              ],
            },
          },
        }),
      ],
      splitChunks: {
        cacheGroups: {
          default: false,
          vendors: false,
          vendor: {
            filename: "assets/js/vendor.[chunkhash:7].bundle.js",
            chunks: "all",
            test: /node_modules/,
          },
        },
      },
    },

    plugins: [
      new FriendlyErrorsWebpackPlugin({
        clearConsole: true,
      }),
      new CopyWebpackPlugin({
        patterns: [
          { from: "../manifest.json" },
          { from: "assets/images", to: "assets/images" },
          { from: "assets/fonts", to: "assets/fonts" },
        ],
      }),
      new MiniCssExtractPlugin({
        filename: "assets/css/[name].css",
        chunkFilename: "[id].css",
      }),
      new HtmlWebpackPlugin({
        minify: false,
        filename: "index.html",
        template: "views/index.pug",
        inject: "body",
      }),
      ...utils.pages(MODE),
      new webpack.ProvidePlugin({
        $: "jquery",
        jQuery: "jquery",
        "window.$": "jquery",
        "window.jQuery": "jquery",
      }),
      new BrowserSyncPlugin(
        {
          host: 'localhost',
          port: 8080,
          proxy: 'http://localhost:8081/',
          files: ['./src/views/**/*.pug', './src/assets/**/*.js'],
          open: false,
          notify: false
        },
        {
          reload: false,
        }
      ),
    ],
  };
};