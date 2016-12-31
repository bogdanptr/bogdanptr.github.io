var gulp          = require('gulp'),
    sass          = require('gulp-sass'),
    pug           = require('gulp-pug'),
    browserSync   = require('browser-sync'). create(),
    clean         = require('gulp-clean'),
    paths         = {
                      extras: [
                        'favicon.ico',
                        'CNAME',
                    ]}

gulp.task('pug', function() {
  return gulp.src('src/templates/**/*.pug')
    .pipe(pug({
      pretty: false,
      compileDebug: true,
      basedir: __dirname + '/src/templates/'
    }))
    .pipe(gulp.dest('dist/'))
    .pipe(browserSync.stream())
});

gulp.task('sass', function() {
  return gulp.src('src/assets/scss/**/*.scss')
  .pipe(sass())
  .pipe(gulp.dest('dist/assets/css'))
  .pipe(browserSync.reload({
    stream: true
  }))
});

// Static server
gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: "dist"
        }
    });
});

gulp.task('clean', function () {
    return gulp.src('dist', {read: false})
        .pipe(clean());
});

gulp.task('copy', function () {
  gulp
    .src(paths.extras,  {cwd: ''})
    .pipe(gulp.dest('dist'));
});

gulp.task('default', ['pug', 'sass', 'browser-sync', 'copy'], function() {});
