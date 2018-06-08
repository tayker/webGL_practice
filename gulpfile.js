var gulp = require('gulp'),
    sass = require('gulp-sass'),
    browser = require('browser-sync').create(),
    sourcemaps   = require('gulp-sourcemaps'),
    postcss      = require('gulp-postcss'),
    autoprefixer = require('autoprefixer'),
    consolidate  = require("gulp-consolidate");


gulp.task('sass', function () {
  return gulp.src('assets/scss/**/*.scss')
    .pipe(sourcemaps.init())
    .pipe(sass({
      output_style: 'compressed'
    }).on('error', sass.logError))
    .pipe(postcss([ autoprefixer({ browsers: ['last 3 version'] }) ]))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('./dist/css'))
    .pipe(browser.stream({match: '**/*.css'}));
});

// Starts a BrowerSync instance
gulp.task('serve', ['sass'], function(){
  browser.init({
        server: {
            baseDir: "./dist"
        }
    });
});

// Runs all of the above tasks and then waits for files to change
gulp.task('default', ['serve'], function() {
  gulp.watch(['assets/scss/**/*.scss'], ['sass']);
  gulp.watch('./dist/*.html').on('change', browser.reload);
  gulp.watch('./dist/script/*.js').on('change', browser.reload);
});