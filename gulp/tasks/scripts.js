const gulp = require('gulp');
const plumber = require('gulp-plumber');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');
const concat = require('gulp-concat');
const mode = require('gulp-mode')();
const paths = require('../paths');
const merge = require('merge-stream');
const rename = require('gulp-rename');
const CONFIGS = require('../pages-config/pages-config');

var rigger = require('gulp-rigger');


const scripts = () => {
  let tasks = CONFIGS.map(config => {
    return gulp
      .src(config.js.src)
      .pipe(plumber())
      .pipe(babel())
      .pipe(rigger())
      // .pipe(concat('scripts.js'))
      .pipe(rename(`${config.page}.js`))
      .pipe(mode.production(uglify()))
      .pipe(gulp.dest(config.buildLocations.js));
  });

  return merge(tasks);

};

module.exports = scripts;
