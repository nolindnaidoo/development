'use-strict';

const gulp = require('gulp-help')(require('gulp')); // require gulp core module with help
const help = require('gulp-help-tasks-tree'); // displays task dependency trees
const gutil = require('gulp-util'); //  module that extends gulp core functionality
const plumber = require('gulp-plumber'); // module for pipe errors
const debug = require('gulp-debug'); // module for additional debug console ouput
const expect = require('gulp-expect-file'); // strict file build control
const size = require('gulp-filesize'); // report filesize from stream/pipe
const browserify = require('browserify'); // use browserify with babel to bundle react
const babelify = require('babelify'); // use babel with browserify to bundle react
const source = require('vinyl-source-stream'); // better interoperability with node
const bump = require('gulp-bump'); // semver control
const eslint = require('gulp-eslint'); // automated ES6 linting
const runSequence = require('run-sequence'); // complex build sequences made simply
const del = require('del'); // clean directories & files
const sass = require('gulp-sass'); // bundle sass/scss files
const path = require('path'); // npm path module
const browsersync = require('browser-sync').create(); // create a browser sync instance.
const sourcemaps = require('gulp-sourcemaps'); // bundle sass / js files with sourcemaps for dev
const rename = require('gulp-rename'); // rename bundle files on demand from within a pipe stream
const concat = require('gulp-concat'); // concat sass bundle files on demand from within a pipe stream
const Server = require('karma').Server; // karma server for phantomjs-prebuilt headless browser-sync
const appName = require('./package.json').name; // declare a hard reference to package.json name
const appVersion = require('./package.json').version; // declare a hard reference to package.json version

// Special Error Handling for watched pipes
const onError = err => {
  gutil.beep();
  gutil.log(err);
  this.emit('end');
};

// "gulp tasks"
gulp.task('tasks', 'display task trees', () => gulp.src('gulpfile.js').pipe(
    help({
      tasks: gulp.tasks,
    }),
  ));

// "gulp semver"
gulp.task('semver', 'display current version', () =>
  gutil.log(`${appName}:  ${appVersion}`));

// "gulp bump:pre"
gulp.task('bump:pre', 'bump pre-release semver', () =>
  gulp
    .src('package.json')
    .pipe(
      plumber({
        errorHandler: onError,
      }),
    )
    .pipe(expect('package.json'))
    .pipe(
      bump({
        type: 'prerelease',
      }),
    )
    .pipe(
      debug({
        title: 'Bump Prerelease:',
      }),
    )
    .pipe(size())
    .pipe(plumber.stop())
    .pipe(gulp.dest('')));

// "gulp bump:patch"
gulp.task('bump:patch', 'bump patch semver', () =>
  gulp
    .src('package.json')
    .pipe(
      plumber({
        errorHandler: onError,
      }),
    )
    .pipe(expect('package.json'))
    .pipe(
      bump({
        type: 'patch',
      }),
    )
    .pipe(
      debug({
        title: 'Bump Patch:',
      }),
    )
    .pipe(size())
    .pipe(plumber.stop())
    .pipe(gulp.dest('')));

// "gulp bump-minor"
gulp.task('bump-minor', 'bump minor semver', () =>
  gulp
    .src('package.json')
    .pipe(
      plumber({
        errorHandler: onError,
      }),
    )
    .pipe(expect('package.json'))
    .pipe(
      bump({
        type: 'minor',
      }),
    )
    .pipe(
      debug({
        title: 'Bump Minor:',
      }),
    )
    .pipe(size())
    .pipe(plumber.stop())
    .pipe(gulp.dest('')));

// "gulp major"
gulp.task('bump-major', 'bump major semver', () =>
  gulp
    .src('package.json')
    .pipe(
      plumber({
        errorHandler: onError,
      }),
    )
    .pipe(expect('package.json'))
    .pipe(
      bump({
        type: 'major',
      }),
    )
    .pipe(
      debug({
        title: 'Bump Major:',
      }),
    )
    .pipe(plumber.stop())
    .pipe(size())
    .pipe(gulp.dest('')));

// "gulp browsersync"
gulp.task('browser-sync', 'browser-sync', () => {
  browsersync.init({
    server: {
      baseDir: 'src',
      port: 8000,
    },
  });
});

// "gulp dev"
gulp.task('dev', 'execute dev sequence', callback =>
  runSequence(
    'clean',
    'lint',
    'test',
    'bump:pre',
    'sass:dev',
    'babel:dev',
    'watch:dev',
    callback,
  ));

// "gulp clean"
gulp.task('clean', 'clean bundled assets', () =>
  del(['coverage', 'src/asset/css/style.css', 'src/asset/js/bundle.js']));

// "gulp lint"
gulp.task('lint', 'eslint everything', () =>
  gulp
    .src(['./gulpfile.js', './src/**/*.js', './src/**/*.jsx'])
    .pipe(
      plumber({
        errorHandler: onError,
      }),
    )
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(
      debug({
        title: 'Lint All:',
      }),
    )
    .pipe(size())
    .pipe(plumber.stop())
    .pipe(eslint.failAfterError()));

// "gulp test"
gulp.task('test', 'unit tests with coverage', done => {
  new Server(
    {
      configFile: path.join(__dirname, '/karma.conf.js'),
      singleRun: true,
    },
    done,
  ).start();
});

// "gulp sass:dev"
gulp.task('sass:dev', 'transpile sass for dev', () =>
  gulp
    .src('./src/**/*.scss')
    .pipe(
      plumber({
        errorHandler: onError,
      }),
    )
    .pipe(sourcemaps.init())
    .pipe(concat('style.scss'))
    .pipe(sass())
    .pipe(
      debug({
        title: 'Bundle Sass with Sourcemaps:',
      }),
    )
    .pipe(sourcemaps.write())
    .pipe(size())
    .pipe(rename('style.css'))
    .pipe(plumber.stop())
    .pipe(gulp.dest('./src/asset/css'))
    .pipe(browsersync.stream()));

// "gulp babel:dev"
gulp.task('babel:dev', 'transpile es6 for dev', () =>
  browserify({
    entries: './src/index.jsx',
    extensions: ['.js', '.jsx'],
    debug: true,
  })
    .transform(babelify, {
      presets: ['es2015', 'react'],
    })
    .bundle()
    .pipe(
      plumber({
        errorHandler: onError,
      }),
    )
    .pipe(source('bundle.js'))
    .pipe(
      debug({
        title: 'Browserify + Babel: ',
      }),
    )
    .pipe(size())
    .pipe(plumber.stop())
    .pipe(gulp.dest('./src/asset/js'))
    .pipe(browsersync.stream()));

// "gulp watch:dev"
gulp.task('watch:dev', 'watch files & hot-reload', ['browser-sync'], () => {
  gulp.watch('./src/img/**/*.{jpg, png, svg}').on('change', browsersync.reload);
  gulp
    .watch('./src/font/**/*.{ttf, woff, eof, svg}')
    .on('change', browsersync.reload);
  gulp.watch('./src/index.html').on('change', browsersync.reload);
  gulp
    .watch('./src/components/**/*.scss', ['sass:dev'])
    .on('change', browsersync.reload);
  gulp.watch('./src/**/*.js', ['babel:dev']).on('change', browsersync.reload);
  gulp.watch('./src/**/*.jsx', ['babel:dev']).on('change', browsersync.reload);
});

// "gulp watch:dev" used to watch sass, html, js, and jsx for changes (not meant to be called individually)
gulp.task(
  'watch:dev',
  'watch:dev for sass, html, js, and jsx',
  ['browser-sync'],
  () => {
    gulp
      .watch('./src/img/**/*.{jpg, png, svg}', ['dev:img'])
      .on('change', browsersync.reload);
    gulp
      .watch('./src/font/**/*.{ttf, woff, eof, svg}', ['dev:font'])
      .on('change', browsersync.reload);
    gulp
      .watch('./src/index.html', ['dev:html'])
      .on('change', browsersync.reload);
    gulp
      .watch('./src/components/**/*.scss', ['sass:dev'])
      .on('change', browsersync.reload);
    gulp.watch('./src/**/*.js', ['babel:dev']).on('change', browsersync.reload);
    gulp
      .watch('./src/**/*.jsx', ['babel:dev'])
      .on('change', browsersync.reload);
  },
);

// "gulp dev:html" bundle html files
gulp.task('dev:html', 'bundle html files', () =>
  gulp
    .src('./src/index.html')
    .pipe(
      plumber({
        errorHandler: onError,
      }),
    )
    .pipe(
      debug({
        title: 'Bundle Html: ',
      }),
    )
    .pipe(size())
    .pipe(plumber.stop())
    .pipe(gulp.dest('dist'))
    .pipe(browsersync.stream()));

// "gulp dev:font" bundle font files
gulp.task('dev:font', 'bundle font files', () =>
  gulp
    .src('./src/font/**/*.{ttf, woff, eof, svg}')
    .pipe(
      plumber({
        errorHandler: onError,
      }),
    )
    .pipe(
      debug({
        title: 'Bundle Font: ',
      }),
    )
    .pipe(size())
    .pipe(plumber.stop())
    .pipe(gulp.dest('dist/asset/font'))
    .pipe(browsersync.stream()));

// "gulp dev:img" bundle img files
gulp.task('dev:img', 'bundle img files', () =>
  gulp
    .src('./src/img/**/*.{jpg, png, svg}')
    .pipe(
      plumber({
        errorHandler: onError,
      }),
    )
    .pipe(
      debug({
        title: 'Bundle img: ',
      }),
    )
    .pipe(size())
    .pipe(plumber.stop())
    .pipe(gulp.dest('dist/asset/img'))
    .pipe(browsersync.stream()));
