var gulp = require('gulp');
var sass = require('gulp-sass');
var inject = require('gulp-inject');

gulp.task('sass', function(){
  return gulp.src('app/scss/**/*.scss')
    .pipe(sass()) // Using gulp-sass
    .pipe(gulp.dest('app/css'))
});

gulp.task('watch', ['sass'], function(){
  gulp.watch('app/scss/**/*.scss', ['sass']);
})

gulp.task('index', function () {
  var target = gulp.src('app/index.html');
  // It's not necessary to read the files (will speed up things), we're only after their paths:
  var sources = gulp.src(['app/**/*.js', 'app/**/*.css'], {read: false});

  return target.pipe(inject(sources,  {relative: true}))
    .pipe(gulp.dest('./app'));
});
