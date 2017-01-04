var gulp          = require('gulp'),
    sass          = require('gulp-sass'),
    pug           = require('gulp-pug'),
    imagemin      = require('gulp-imagemin'),
    autoprefixer  = require('gulp-autoprefixer'),
    browserSync   = require('browser-sync'). create(),
    clean         = require('gulp-clean'),
    paths         = {
                      extras: [
                        'favicon.ico',
                        'CNAME',
                    ]}

gulp.task('css', function() {
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

gulp.task('sass', function() {
  return gulp.src('src/assets/scss/**/*.scss')
  .pipe(sass())
  .pipe(gulp.dest('dist/assets/css'))
  .pipe(browserSync.reload({
    stream: true
  }))
});

gulp.task('images', function() {
  return gulp.src('src/assets/img/**/*')
    .pipe(imagemin([
       imagemin.gifsicle(),
       imagemin.jpegtran({progressive: true}),
       imagemin.optipng(),
       imagemin.svgo()
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
});

gulp.task('default', ['pug', 'sass', 'images', 'browser-sync', 'copy'], function() {});
