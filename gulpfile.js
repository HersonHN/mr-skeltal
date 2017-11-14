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

const minify = composer(uglifyES, console);
const conf = require('./conf.json');
const path = conf.path;


function js() {
  // unlike the css task, this will break if the src/js/ folder is empty
  return gulp.src([path.js.files])
    .pipe(named())
    .pipe(gulpWebpack({ output: { filename: '[name].js' } }, webpack));
}


gulp.task('js', function () {
  return js()
    .pipe(gulp.dest(path.js.dest))
    .pipe(livereload());
});


gulp.task('js:prod', function () {
  return js()
    .pipe(minify())
    .pipe(gulp.dest(path.js.prod));
});


gulp.task('css', function () {
  return gulp
    .src(path.css.files)
    .pipe(plumber())
    .pipe(sourcemaps.init())
    .pipe(sass({
      includePaths: ['./node_modules']
    }))
    .pipe(autoprefixer())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(path.css.dest))
    .pipe(livereload());
});


gulp.task('css:prod', function () {
  return gulp
    .src(path.css.files)
    .pipe(plumber())
    .pipe(sass({
      outputStyle: 'compressed',
      includePaths: ['./node_modules']
    }))
    .pipe(autoprefixer())
    .pipe(gulp.dest(path.css.prod));
});


gulp.task('watch:css', function () {
  livereload.listen(conf.livereload);

  gulp.watch(path.css.files, ['css']);
  gulp.watch(path.css.filesInFolders, ['css']);
});


gulp.task('watch:js', function () {
  livereload.listen(conf.livereload);

  gulp.watch(path.js.files, ['js']);
  gulp.watch(path.js.filesInFolders, ['js']);
});


gulp.task('watch', ['watch:css', 'watch:js']);
gulp.task('prod', ['css:prod', 'js:prod']);
gulp.task('default', ['css', 'js', 'watch']);
