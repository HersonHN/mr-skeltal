
const gulp = require('gulp');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const plumber = require('gulp-plumber');
const uglify  = require('gulp-uglify');
const changed = require('gulp-changed');
const gulpWebpack = require('gulp-webpack');
const webpack = require('webpack');
const named = require('vinyl-named');


gulp.task('js', function() {
  return gulp.src(['./src/js/*.js'])
    .pipe(named())
    .pipe(gulpWebpack({ output: { filename: '[name].js' } }, webpack))
    .pipe(gulp.dest('./build/js'));
});


gulp.task('css', function() {
  return gulp
    .src('./src/scss/*.scss')
    .pipe(plumber())
    .pipe(sass({
      outputStyle: 'compressed',
      // including node modules in case of using bootstrap or foundation
      includePaths: ['./node_modules']
    }))
    .pipe(autoprefixer())
    .pipe(gulp.dest('./build/css'));
});


gulp.task('watch:css', function() {
  gulp.watch('./src/scss/**/*.scss', ['css']);
  gulp.watch('./src/scss/*.scss', ['css']);
});


gulp.task('watch:js', function() {
  gulp.watch('./src/js/**/*.js', ['js']);
  gulp.watch('./src/js/*.js', ['js']);
});


gulp.task('watch', ['watch:css', 'watch:js']);
gulp.task('default', ['css', 'js', 'watch']);

