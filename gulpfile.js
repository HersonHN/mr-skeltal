'use strict';

const gulp = require('gulp');
const autoprefixer = require('gulp-autoprefixer');
const composer = require('gulp-uglify/composer');
const gulpWebpack = require('gulp-webpack');
const livereload = require('gulp-livereload');
const plumber = require('gulp-plumber');
const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');
const named = require('vinyl-named');
const uglifyES = require('uglify-es');
const webpack = require('webpack');

const conf = require('./conf.json');
const minify = composer(uglifyES, console);


function js() {
  // unlike the css task, this will break if the src/js/ folder is empty
  return gulp.src(['./src/js/*.js'])
    .pipe(named())
    .pipe(gulpWebpack({ output: { filename: '[name].js' } }, webpack));
}


gulp.task('js', function () {
  return js()
    .pipe(gulp.dest('./build/js'))
    .pipe(livereload());
});


gulp.task('js:prod', function () {
  return js()
    .pipe(minify())
    .pipe(gulp.dest('./build/js'));
});


gulp.task('css', function () {
  return gulp
    .src('./src/scss/*.scss')
    .pipe(plumber())
    .pipe(sourcemaps.init())
    .pipe(sass({
      includePaths: ['./node_modules']
    }))
    .pipe(autoprefixer())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('./build/css'))
    .pipe(livereload());
});


gulp.task('css:prod', function () {
  return gulp
    .src('./src/scss/*.scss')
    .pipe(plumber())
    .pipe(sass({
      outputStyle: 'compressed',
      includePaths: ['./node_modules']
    }))
    .pipe(autoprefixer())
    .pipe(gulp.dest('./build/css'));
});


gulp.task('watch:css', function () {
  livereload.listen(conf.livereload);

  gulp.watch('./src/scss/**/*.scss', ['css']);
  gulp.watch('./src/scss/*.scss', ['css']);
});


gulp.task('watch:js', function () {
  livereload.listen(conf.livereload);

  gulp.watch('./src/js/**/*.js', ['js']);
  gulp.watch('./src/js/*.js', ['js']);
});


gulp.task('watch', ['watch:css', 'watch:js']);
gulp.task('prod', ['css:prod', 'js:prod']);
gulp.task('default', ['css', 'js', 'watch']);
