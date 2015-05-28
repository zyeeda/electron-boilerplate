var gulp      = require('gulp');
var watch     = require('gulp-watch');
var karma     = require('gulp-karma');
var childExec = require('child_process').exec;
var webpack   = require('gulp-webpack');

// copy config
gulp.task('copy-config', function() {
  return gulp.src(['./app/index.html', './app/bootstrap.js', './app/package.json'])
    .pipe(gulp.dest('./dist'));
});

// 打包
gulp.task('package', ['copy-config'], function() {
  return gulp.src('./app/main.js')
    .pipe(webpack({
        output: {
            filename: 'bundle.js',
            sourceMapFilename: 'map.js',
            eval: true,
            devtool: 'source-map'
        },
        module: {
            preLoaders: [
              {
                test: /\.(js|jsx)$/,
                loader: 'source-map-loader',
                exclude: /node_modules/
              }
            ],
            loaders: [
              {test: /\.css$/, loader: 'style-loader!css-loader'},
              {test: /\.scss$/, loader: 'style-loader!css-loader!sass-loader'},
              {test: /\.(png|jpg|jpeg|gif)$/, loader: 'url-loader?limit=8192'},
              {test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: 'url-loader?limit=10000&minetype=application/font-woff' },
              {test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: 'file-loader' },
              {
                test: /\.(js|jsx)$/,
                loaders: [
                  'jsx?harmony&stripTypes', 
                  'flowcheck'
                ],
                exclude: /node_modules/
              }
            ]
          }
    }))
    .pipe(gulp.dest('./dist'));
});

gulp.task( 'watch-source', [], function(){
    gulp.watch('./app/**/*', ['package'] );
});

gulp.task( 'watch', ['package', 'watch-source']);


// 运行测试 --无法输出日志信息
// gulp.task('test', function (cb) {
//   // var cmd = 'node_modules/karma/bin/karma start ' + __dirname + '/karma.conf.js';
//   var cmd = ' npm test';
//   var child = childExec(cmd, function (err, stdout, stderr) {
//     console.log(stdout);
//     console.log(stderr);
//     cb(err);
//   });
//   child.stdout.on('info', function (info) {
//     console.log(info);
//   });
//   child.stderr.on('info', function (info) {
//     console.log(info);
//   });
// });

// 使用 gulp-karma 组件进行测试，无法输入日志（可能是 gulp-karma 组件存在问题）
gulp.task('test', function() {
  // Be sure to return the stream
  return gulp.src(['./build/**/*.js'])
    .pipe(karma({
      configFile: __dirname + '/karma.conf.js',
      action: 'run'
    }))
    .on('error', function(err) {
      // Make sure failed tests cause gulp to exit non-zero
      console.log(err);
      throw err;
    });
});

// 运行 electron
gulp.task('run', function (cb) {
  var cmd = 'electron ' + __dirname + '/dist';
  var child = childExec(cmd, function (err, stdout, stderr) {
    console.log(stdout);
    console.log(stderr);
    cb(err);
  });

  // 输出标准输出和标准错误到控制台
  child.stdout.on('info', function (info) {
    console.log(info);
  });
  child.stderr.on('info', function (info) {
    console.log(info);
  });
});
