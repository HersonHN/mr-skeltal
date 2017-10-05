
const gulp = require('gulp');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const plumber = require('gulp-plumber');
const uglify  = require('gulp-uglify');
const changed = require('gulp-changed');


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


gulp.task('watch', ['watch:css']);

