'use strict';

const gulp = require('gulp'),
      sass = require('gulp-sass'),
      minify = require('gulp-minify'),
      bs = require('browser-sync').create(),
      bsSSi = require('browsersync-ssi'),
      cleanCSS = require('gulp-clean-css'),
      cache = require('gulp-cache'),
      sourcemaps = require('gulp-sourcemaps');

const src = 'src';

const paths = {
  styles: {
    src: src + '/scss/**/**/*.scss',
    dest: 'assets/css'
  },
  scripts: {
    src: src + '/js/**/*.js',
    dest: 'assets/js'
  },
  components: {
    src: src + '/components/*.html',
    dest: 'assets/components'
  },
  index: {
    src: src + '/*.html',
    dest: 'assets'
  }
}

const browserSync = done => {
  bs.init({
    port: 3000,
    open: false,
    server: {
      baseDir: ['./assets'],
      middleware: [
        require('connect-modrewrite')([
          '^(.*)\.html$ $1.shtml'
        ]), function(req, res, next) {
          var fs = require('fs');
          var ssi = require('ssi');
          var baseDir = './assets';
          var pathname = require('url').parse(req.url).pathname;
          var filename = require('path').join(baseDir, pathname.substr(-1) === '/' ? pathname + 'index.html' : pathname);

          var parser = new ssi('src', paths.index.dest, '/index.html');

          if (filename.indexOf('.html') > -1 && fs.existsSync(filename)) {
            res.end(
              parser
              .parse(filename, fs.readFileSync(filename, {
                encoding: 'utf8'
              })).contents,
              parser.compile()
            );
          }
          else
            next();
        },
        bsSSi({
          baseDir: __dirname + '/assets',
          ext: '.html',
        })
      ]
    }
  })
  done();
}

const browserSyncStream = path => {
  cache.clearAll();
  return gulp.src(path).pipe(bs.stream());
}
const browserSyncReload = path => {
  cache.clearAll();
  return gulp.src(path).pipe(bs.reload({stream: true}));
}

const styles = () => {
  return (
    gulp
      .src(paths.styles.src, {
        sourcemaps: true
      })
      .pipe(sourcemaps.init())
      .pipe(sass())
      .pipe(cleanCSS({
        debug: true
      }))
      .pipe(sourcemaps.write('../maps'))
      .pipe(cache.clear())
      .pipe(gulp.dest(paths.styles.dest))
  )
}
const scripts = () => {
  return (
    gulp
      .src(paths.scripts.src, {
        sourcemaps: true
      })
      .pipe(minify())
      .pipe(gulp.dest(paths.scripts.dest))
      .pipe(cache.clear())
  )
}

const components = () => {
  return (
    gulp
      .src([paths.components.src])
      .pipe(gulp.dest(paths.components.dest))
      .pipe(cache.clear())
  )
}


const copyIndex = () => {
  return (
    gulp
      .src(paths.index.src)
      .pipe(gulp.dest(paths.index.dest))
      .pipe(cache.clear())
  )
}

const watch = () => {
  gulp.watch(paths.styles.src, styles).on('change', path => browserSyncStream(path));
  gulp.watch(paths.scripts.src, scripts).on('change', path => browserSyncReload(path));
  gulp.watch(paths.components.src, components).on('change', path => browserSyncReload(path));
  gulp.watch(paths.index.src, copyIndex).on('change', path => browserSyncReload(path));
}

const taskSync = gulp.parallel(browserSync, styles, scripts, watch, copyIndex);

gulp.task('default', taskSync);