'use strict';

const gulp = require('gulp'),
      sass = require('gulp-sass'),
      uglify = require('gulp-uglify'),
      bs = require('browser-sync').create(),
      connectSSI = require('connect-ssi'),
      cleanCSS = require('gulp-clean-css');

const src = 'src';

const paths = {
  styles: {
    src: src + '/scss/**/*.scss',
    dest: 'assets/css'
  },
  scripts: {
    src: src + '/js/*.js',
    dest: 'assets/js'
  },
  components: {
    src: src + '/components/*.html',
    dest: 'assets/components'
  },
  main: {
    src: src + '/*.html',
    dest: 'assets/'
  }
}

const browserSync = done => {
  bs.init({
    port: 3000,
    open: true,
    server: {
      baseDir: "./",
      index: "src/index.html"
    }
  })
  done();
}
const browserSyncStream = path => gulp.src(path).pipe(bs.stream())
const browserSyncReload = path => gulp.src(path).pipe(bs.reload({stream: true}))

const styles = () => {
  return (
    gulp
      .src(paths.styles.src, {
        sourcemaps: true
      })
      .pipe(sass())
      .pipe(cleanCSS({
        debug: true
      }))
      .pipe(gulp.dest(paths.styles.dest))
  )
}
const scripts = () => {
  return (
    gulp
      .src(paths.scripts.src, {
        sourcemaps: true
      })
      .pipe(uglify())
      .pipe(gulp.dest(paths.scripts.dest))
  )
}

const components = () => {
  return (
    gulp
      .src([paths.components.src])
      .pipe(gulp.dest(paths.components.dest))
  )
}

const main = () => {
  return (
    gulp
      .src([paths.main.src])
      .pipe(gulp.dest(paths.main.dest))
  )
}

const watch = () => {
  gulp.watch(paths.styles.src, styles).on('change', path => browserSyncStream(path));
  gulp.watch(paths.scripts.src, scripts).on('change', path => browserSyncReload(path));
  gulp.watch(paths.components.src, components).on('change', path => browserSyncReload(path));
}

const taskSync = gulp.parallel(browserSync, styles, scripts, main, watch);

gulp.task('default', taskSync);