'use strict';

var gulp = require('gulp');
var config = require('../gulpconfig.json')

var browserSync = require('browser-sync');

gulp.task('watch', ['styles', 'scripts:dev'], function() {

    browserSync({
        browser: config.sync.browser,
        files: config.sync.files,
        open: config.sync.open,
        proxy: config.sync.proxy,
        watchOptions: {
            debounceDelay: 1000
        }
    });

    gulp.watch(config.src.watch.scripts, {interval: 500}, ['scripts:dev']);
    gulp.watch(config.src.watch.lint, {interval: 500}, ['scripts:lint']);
    gulp.watch(config.src.watch.styles, {interval: 500}, ['styles']);

});