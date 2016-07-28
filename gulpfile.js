var gulp = require('gulp'),
    less = require('gulp-less'),
    autoprefixer = require('gulp-autoprefixer'),
    minifycss = require('gulp-minify-css'),
    imagemin = require('gulp-imagemin'),
    cache = require('gulp-cache');


// Styles
gulp.task('styles', function() {
  gulp.src(['src/styles/app.less'])
      .pipe(less())
      .pipe(autoprefixer(
          'last 2 version',
          'safari 5',
          'ie 8', 'ie 9',
          'opera 12.1',
          'ios 6', 'android 4')
  )
      .pipe(minifycss())
      .pipe(gulp.dest('src'))
});

// Images
gulp.task('images', function() {
  return gulp.src('src/img/**/*')
      .pipe(cache(imagemin({
        optimizationLevel: 3,
        progressive: true,
        interlaced: true }))
  )
      .pipe(gulp.dest('public/img'))
});


// Run tasks
gulp.task('default', function() {

  gulp.run('styles', 'images');

  gulp.watch('src/styles/**', function(ev) {
    console.log('File ' + ev.path + ' was ' + ev.type + ', running tasks...');
    gulp.run('styles');
  });

  gulp.watch('src/img/**/*', function(ev) {
    console.log('File ' + ev.path + ' was ' + ev.type + ', running tasks...');
    gulp.run('images');
  });
});