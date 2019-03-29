const gulp = require('gulp');
const sass = require('gulp-sass');
const minifycss = require('gulp-minify-css');
const uglify = require('gulp-uglify');
const del = require('del');
const rev = require('gulp-rev');

gulp.task('clean_build', function() {
  return del(['public/']);
});

gulp.task('sass', function () {
    return gulp.src(['assets/css/*.scss'])
    .pipe(sass({
        outputStyle: 'expanded'
    }))
    // .pipe(minifycss())
    .pipe(gulp.dest('public/'));
});

gulp.task('scripts', function() {
    return gulp.src(['assets/js/*'])
      .pipe(uglify())
      .pipe(gulp.dest('public/'));
});

gulp.task('images', function() {
    return gulp.src(['assets/images/*'])
  .pipe(gulp.dest('public/'));
});

gulp.task('versioning', function() {
return gulp.src(['public/**/*'])
  .pipe(rev())
  .pipe(gulp.dest('public/'))
  .pipe(rev.manifest())
  .pipe(gulp.dest('public/'));
});

gulp.task('watch:css', function () {
    gulp.watch('assets/css/*.css', gulp.series('sass'));
});

gulp.task('default', gulp.series('clean_build', 'sass', 'images', 'scripts', 'versioning'));