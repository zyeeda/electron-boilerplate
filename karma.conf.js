var webpack = require("webpack");

module.exports = function(config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine-jquery', 'jasmine'],
    files: [
      './app/__tests__/**/*'
    ],
    exclude: [
      './node_modules'
    ],
    preprocessors: {
      './app/__tests__/**/*': ['jasmine-jquery', 'webpack']
    },
    webpack: {
      module: {
          loaders: [
            {test: /\.css$/, loader: 'style-loader!css-loader'},
            {test: /\.scss$/, loader: 'style-loader!css-loader!sass-loader'},
            {test: /\.(png|jpg|jpeg|gif)$/, loader: 'url-loader?limit=8192'},
            {test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "url-loader?limit=10000&minetype=application/font-woff" },
            {test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "file-loader" },
            {
              test: /\.(jsx)$/, 
              loaders: [
                'jsx?harmony&stripTypes', 
                'flowcheck'
              ],
              exclude: /node_modules/
            }
          ]
        }
    }, 
    // reporters: ['progress', 'coverage'],
    // reporters: ['progress'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    // browsers: ['Chrome', 'Electron'],
    browsers: ['Chrome'],
    singleRun: false,
    coverageReporter: {
      type : 'html',
      dir : 'coverage/'
    },
    plugins: [
      require("karma-jasmine-jquery"),
      require("karma-chrome-launcher"),
      require("karma-coverage"),
      require("karma-electron-launcher"),
      require("karma-jasmine"),
      require("karma-requirejs"),
      require("karma-webpack")
    ]
  });
};