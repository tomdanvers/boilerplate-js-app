'use strict';

var gulp = require('gulp');
var config = require('../gulpconfig.json')

var rename = require('gulp-rename');
var stylus = require('gulp-stylus');

gulp.task('styles', function() {

    return gulp.src([config.src.styles])
    .pipe(stylus())
    .pipe(rename(config.dest.names.css))
    .pipe(gulp.dest(config.dest.paths.css));

});