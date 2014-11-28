var gulp = require('gulp');
var connect = require('gulp-connect');
var colors = require('colors');
var watch = require('gulp-watch');
var concat = require('gulp-concat');
var sass = require('gulp-sass');
var minifyCss = require('gulp-minify-css');
var rename = require('gulp-rename');

gulp.task('sass', function(done) {
  gulp.src('./styles/app.scss')
    .pipe(sass())
    .pipe(gulp.dest('./styles/'))
    .pipe(minifyCss({
      keepSpecialComments: 0
    }))
    .pipe(rename({ extname: '.min.css' }))
    .pipe(gulp.dest('./styles/'))
    .pipe(connect.reload())
    .on('end', done);
});

gulp.task('dev', function() {
  // Start a server
  connect.server({
    root: '',
    port: 3000,
    livereload: true
  });
  console.log('[CONNECT] Listening on port 3000'.yellow.inverse);

  // Watch HTML files for changes
  console.log('[CONNECT] Watching files for live-reload'.blue);
  watch({ glob: ['./index.html', './app/**/*.*']})
    .pipe(connect.reload());

  // Watch HTML files for changes
  console.log('[CONNECT] Watching SASS files'.blue);
  gulp.watch('./styles/*.scss', ['sass']);
});

gulp.task('default', [], function() {
  console.log('***********************'.yellow);
  console.log('  gulp dev'.yellow);
  console.log('***********************'.yellow);
  return true;
});