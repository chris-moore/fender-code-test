// gulp
var gulp = require('gulp'),

// plugins
  $ = require('gulp-load-plugins')(),
	connect = require('gulp-connect'),
	watch = require('gulp-watch'),
	sass = require('gulp-sass'),
	livereload = require('gulp-livereload'),
	concat = require('gulp-concat'),
	fileinclude = require('gulp-file-include'),
  usemin = require('gulp-usemin'),
  uglify = require('gulp-uglify'),
  minifyHtml = require('gulp-minify-html'),
  minifyCss = require('gulp-minify-css'),
  rev = require('gulp-rev'),
  del = require('del'),

// settings
  APP_DIR = 'app',
  BUILD_DIR = 'dist'
  htmlMinifyOpts = {
    quotes: true,
    empty: true,
    spare: true,
    loose: true
  };

// Serve the site on a localhost
gulp.task('connect', function () {
	connect.server({
		root: 'app/',
		port: 3000
	});
});

// Watch scss files for changes, then run the 'sass' task
gulp.task('watch', function () {
	livereload.listen();
	gulp.watch(['./app/**/*.scss', './app/**/**/*.scss'], ['sass']);
  gulp.watch(['./app/*.html', './app/**/*.html'], ['templates']);
  gulp.watch(['./app/components/**/*.js', './app/**/*.js', './app/*.js'], ['usemin']);
});

gulp.task('sass', function () {
  return gulp.src(['./app/styles.scss'])
    .pipe(sass({ style: 'expanded' }))
    .pipe(gulp.dest("./app/"));
});

gulp.task('data', function () {
  return gulp.src('./app/data/*.json')
    .pipe(fileinclude({
      prefix: '@@',
      basepath: '@file'
    }))
    .pipe(gulp.dest('./dist/data/'));
});

gulp.task('clean', function (cb) {
  del([
    'dist/*',
  ], cb);
});

gulp.task('clean-scss', function(cb) {
  del([
    BUILD_DIR+'/*.scss', BUILD_DIR+'/**/*.scss'
  ], cb);
});

gulp.task('usemin', function () {
  return gulp.src('./*.html')
      .pipe(usemin({
        css: [minifyCss(), 'concat'],
        html: [minifyHtml({empty: true})],
        js_lib: [uglify(), rev()],
        js_app: [uglify(), rev()]
      }))
      .pipe(gulp.dest('./dist/'));
});

gulp.task('copy-components', ['clean'], function() {
  return gulp.src([
      '!'+APP_DIR+'/index.html', 
      '!'+APP_DIR+'/**/*.scss',
      '!'+APP_DIR+'/**/*.js',
      '!'+APP_DIR+'/bower_components',
      '!'+APP_DIR+'/bower_components/**',
      APP_DIR+'/**/*'
    ])
    .pipe(gulp.dest(BUILD_DIR+'/'));
});

gulp.task('usemin', ['clean-scss'], function () {
  var annotateOpts = {
    remove: true,
    add: true
  };
  return gulp.src('./'+APP_DIR+'/index.html')
    .pipe($.usemin({
      html: [
        $.minifyHtml(htmlMinifyOpts)
      ],
      css: [
        $.minifyCss(),
        'concat',
        $.rev()
      ],
      js_lib: [
        $.sourcemaps.init(),
        $.rev()
      ],
      js_app: [
        $.sourcemaps.init(),
        $.rev()
      ]
    }))
    .pipe($.sourcemaps.write('./'))
    .pipe(gulp.dest(BUILD_DIR+'/'));
});

gulp.task('templates', function () {
  return gulp.src(['./app/index.html'])
    .pipe(fileinclude({
      prefix: '@@',
      basepath: '@file'
    }))
    .pipe(gulp.dest('./dist/'));
});



// Start the local server, watch and compile changes to SCSS files, minify CSS
gulp.task('run', ['watch', 'connect', 'templates']);
gulp.task('default', ['watch', 'connect', 'templates']);

// Compile the build completely, css, js, templates
gulp.task('compile', ['sass', 'usemin', 'templates', 'data', 'copy-components']);
