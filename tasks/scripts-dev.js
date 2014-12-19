'use strict';

var gulp = require('gulp');
var config = require('../gulpconfig.json')

var browserify = require('browserify');
var source = require('vinyl-source-stream');

gulp.task('scripts:dev', ['scripts:lint'], function() {

    return browserify({
        debug: true,
        entries: [config.src.scripts],
        extensions: ['.hbs']
    })
    .bundle()
    .pipe(source(config.dest.names.js))
    .pipe(gulp.dest(config.dest.paths.js));

});