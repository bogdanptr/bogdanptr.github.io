var gulp          = require('gulp'),
    sass          = require('gulp-sass'),
    pug           = require('gulp-pug'),
    imagemin      = require('gulp-imagemin'),
    autoprefixer  = require('gulp-autoprefixer'),
    uglify        = require('gulp-uglify'),
    browserSync   = require('browser-sync'). create(),
    clean         = require('gulp-clean'),
    paths         = {
                      extras: [
                        'favicon.ico',
                        'favicon.png',
                        'favicon.svg',
                        'CNAME',
                        'robots.txt'
                      ],
                      fonts: [
                        'MonumentExtended-Regular.woff',
                        'MonumentExtended-Regular.woff2'
                      ]}

gulp.task('scss', function() {
  return gulp.src('src/assets/scss/**/*.scss')
    .pipe(sass({
          includePaths: ['src/assets/scss'],
          outputStyle: 'compressed',
          errLogToConsole: true
        }))
    .pipe(
      autoprefixer({
        browsers: ['last 2 versions'],
        cascade: false
    }))
    .pipe(gulp.dest('dist/assets/css/'))
    .pipe(browserSync.reload({
      stream: true
    }))
});

gulp.task('pug', function() {
  return gulp.src(['src/templates/**/*.pug',
                  '!src/templates/layout/**/*',
                  '!src/templates/includes/**/*'])
    .pipe(pug({
      pretty: false,
      compileDebug: true,
      basedir: __dirname + '/src/templates/'
    }))
    .pipe(gulp.dest('dist/'))
    .pipe(browserSync.stream())
});

gulp.task('js', function () {
  return gulp.src('src/assets/js/**/*.js')
    .pipe(uglify())
    .pipe(gulp.dest('dist/assets/js/'))
    .pipe(browserSync.reload({
      stream: true
    }))
});

gulp.task('images', function() {
  return gulp.src('src/assets/img/**/*')
    .pipe(imagemin([
       imagemin.gifsicle(),
       imagemin.jpegtran({progressive: true}),
       imagemin.optipng()
     ]))
    .pipe(gulp.dest('dist/assets/img'))
    .pipe(browserSync.reload({
      stream: true
    }))
});

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
    .src(paths.extras,  {cwd: 'src/'})
    .pipe(gulp.dest('dist'));
  gulp
    .src(paths.fonts,  {cwd: 'src/assets/fonts/'})
    .pipe(gulp.dest('dist/assets/fonts'));
});

// Rerun the task when a file changes
gulp.task('watch', function() {
  gulp.watch('src/assets/scss/**/*.scss', ['scss']);
  gulp.watch('src/assets/js/**/*.js',     ['js']);
  gulp.watch('src/assets/img/**/*',       ['images']);
  gulp.watch('src/templates/**/*',        ['pug', 'copy']);
});

gulp.task('default', ['pug', 'scss', 'js', 'images', 'browser-sync', 'copy', 'watch'], function() {});
gulp.task('build', ['pug', 'scss', 'js', 'images', 'copy'], function() {});
