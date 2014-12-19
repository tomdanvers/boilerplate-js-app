'use strict';

var gulp = require('gulp');

require('require-dir')('tasks');

gulp.task('default', [
  'watch'
]);

gulp.task('distribution', [
  'scripts:dist',
  'styles'
]);