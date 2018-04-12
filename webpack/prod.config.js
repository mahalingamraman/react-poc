var CommonsPlugin = new require("webpack/lib/optimize/CommonsChunkPlugin");
var CaseSensitivePathsPlugin = require("case-sensitive-paths-webpack-plugin");
var BundleAnalyzerPlugin = require("webpack-bundle-analyzer")
  .BundleAnalyzerPlugin;

var fs = require("fs");
var path = require("path");
var webpack = require("webpack");
var CleanPlugin = require("clean-webpack-plugin");

var projectRootPath = path.resolve(__dirname, "../");
var assetsPath = path.resolve(projectRootPath, "./public/static/dist");

var babelrc = fs.readFileSync("./.babelrc");
var babelrcObject = {};

try {
  babelrcObject = JSON.parse(babelrc);
} catch (err) {
  console.error("ERROR: Error parsing your .babelrc.");
  console.error(err);
}

babelrcObject.presets[0] = ["es2015", { modules: false }];

module.exports = {
  devtool: "source-map",
  context: path.resolve(__dirname, ".."),
  entry: {
    main: ["./client/index.js"],
    common: ["react", "react-bootstrap", "lodash"],
    bootstrap: "./vendor/bootstrap.js"
  },
  output: {
    path: assetsPath,
    filename: "[name].js",
    chunkFilename: "[name]-[chunkhash].js"
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        include: [path.resolve(__dirname, "..", "client")],
        loader: "babel-loader",
        options: babelrcObject
      },
      {
        test: /\.json$/,
        loader: "json-loader"
      },
      {
        test: /\.worker\.js$/,
        use: { loader: "worker-loader" }
      },
      {
        test: /\.js$/,
        loader: "eslint-loader",
        include: path.resolve(__dirname, "..", "client"),
        exclude: [/vendor/],
        query: {
          configFile: ".eslintrc",
          failOnError: true,
          failOnWarning: true
        }
      },
      {
        test: /\.css$/,
        use: [
          "style-loader",
          "css-loader",
          {
            loader: "postcss-loader",
            options: {
              plugins: []
            }
          }
        ]
      },
      {
        test: /\.less$/,
        use: [
          "style-loader",
          "css-loader",
          {
            loader: "postcss-loader",
            options: {
              plugins: []
            }
          },
          "less-loader"
        ]
      },
      {
        test: /\.scss$/,
        use: [
          "style-loader",
          "css-loader",
          {
            loader: "postcss-loader",
            options: {
              plugins: []
            }
          },
          {
            loader: "sass-loader",
            options: {
              includePaths: [path.resolve(__dirname, "..", "node_modules")]
            }
          }
        ]
      },
      {
        test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,
        loader: "url-loader",
        options: {
          limit: 10000,
          mimetype: "application/font-woff"
        }
      },
      {
        test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/,
        loader: "url-loader",
        options: {
          limit: 10000,
          mimetype: "application/font-woff"
        }
      },
      {
        test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
        loader: "url-loader",
        options: {
          limit: 10000,
          mimetype: "application/octet-stream"
        }
      },
      {
        test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
        loader: "file-loader"
      },
      {
        test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
        loader: "url-loader",
        options: {
          limit: 10000,
          mimetype: "image/svg+xml"
        }
      },
      {
        test: /\.png|jpg|jpeg|gif/,
        loader: "url-loader",
        options: {
          limit: 10240
        }
      }
    ]
  },
  resolve: {
    modules: ["client", "node_modules"],
    extensions: [".json", ".js", ".jsx"],
    alias: {
      react: path.resolve("./node_modules/react"),
      "react-dom": path.resolve("./node_modules/react-dom")
    }
  },
  plugins: [
    new CaseSensitivePathsPlugin(),
    new CommonsPlugin({
      minChunks: 3,
      name: "common"
    }),
    new CleanPlugin([assetsPath], { root: projectRootPath }),
    new webpack.DefinePlugin({
      "process.env.NODE_ENV": '"production"'
    }),

    new webpack.IgnorePlugin(/\.\/dev/, /\/config$/),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({
      mangle: false,
      output: { comments: false },
      sourceMap: false,
      compress: true
    }),
    new webpack.optimize.AggressiveMergingPlugin({}),
    // new BundleAnalyzerPlugin({
    //   analyzerMode: 'server',
    //   analyzerHost: '127.0.0.1',
    //   analyzerPort: 8888,
    //   reportFilename: 'report.html',
    //   openAnalyzer: true,
    //   generateStatsFile: false,
    //   statsFilename: 'stats.json',
    //   statsOptions: null,
    //   logLevel: 'info'
    // }),
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/)
  ],
  stats: "errors-only"
};
