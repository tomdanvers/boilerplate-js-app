'use strict';

var gulp = require('gulp');
var config = require('../gulpconfig.json');

var browserify = require('browserify');
var rename = require('gulp-rename');
var source = require('vinyl-source-stream');
var streamify = require('gulp-streamify');
var strip = require('gulp-strip-debug');
var uglify = require('gulp-uglify');

gulp.task('scripts:dist', ['scripts:lint'], function() {

    return browserify({
        entries: [config.src.scripts],
        extensions: ['.hbs']
    })
    .bundle()
    .pipe(source(config.dest.names.js))
    .pipe(gulp.dest(config.dest.paths.js))
    .pipe(streamify(strip()))
    .pipe(streamify(uglify()))
    .pipe(rename(config.dest.names.jsmin))
    .pipe(gulp.dest(config.dest.paths.js));

});