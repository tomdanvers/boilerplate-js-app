var gulp = require('gulp');

var browserify = require('browserify');
var browserSync = require('browser-sync');
var crashSound = require('gulp-crash-sound');
// var es = require('event-stream');
var jshint = require('gulp-jshint');
var rename = require('gulp-rename');
var source = require('vinyl-source-stream');
var streamify = require('gulp-streamify');
var strip = require('gulp-strip-debug');
var stylus = require('gulp-stylus');
var uglify = require('gulp-uglify');
var watch = require('gulp-watch');
var watchify = require('watchify');


/*-------------------------------------------------*/
/*WATCH--------------------------------------------*/
/*-------------------------------------------------*/

gulp.task('watch', ['styles'], function() {

    var paths = {
        src: {
            styles: 'source/**/*.{css,styl}',
            scripts: 'source/**/*.{js,hbs}',
            lint: [
                'gulpfile.js',
                'source/**/*.js'
            ]
        },
        sync: [
            'distribution/css/main.min.css',
            'distribution/js/main.js',
        ]
    };

    // start browser sync (and watch static files)
    browserSync({
        browser: 'google chrome',
        files: paths.sync,
        open: 'local',
        proxy: 'boilerplate',
        watchOptions: {
            debounceDelay: 1000
        }
    });

    // watch src gulp tasks
    gulp.watch(paths.src.scripts, {interval: 500}, ['scripts:dev']);
    gulp.watch(paths.src.styles, {interval: 500}, ['styles']);
    gulp.watch(paths.src.lint, {interval: 500}, ['lint']);

});

/*-------------------------------------------------*/
/*DISTRIBUTION-------------------------------------*/
/*-------------------------------------------------*/

gulp.task('lint', function() {
    return gulp.src('source/js/app/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

gulp.task('scripts:dev', ['lint'], function() {

    return browserify({
        debug: true,
        entries: ['./source/js/app/main.js'],
        extensions: ['.hbs']
    })
    .bundle()
    .pipe(source('main.js'))
    .pipe(gulp.dest('./distribution/js'));

});

gulp.task('scripts:dist', ['lint'], function() {

    return browserify({
        entries: ['./source/js/app/main.js'],
        extensions: ['.hbs']
    })
    .bundle()
    .pipe(source('main.js'))
    .pipe(gulp.dest('./distribution/js'))
    .pipe(streamify(strip()))
    .pipe(streamify(uglify()))
    .pipe(rename('main.min.js'))
    .pipe(gulp.dest('./distribution/js'));

});


gulp.task('styles', function() {
    return gulp.src(['source/css/styles.styl'])
    .pipe(stylus())
    .pipe(rename('main.min.css'))
    .pipe(gulp.dest('distribution/css'));
});

/*-------------------------------------------------*/
/*TASK GROUPS--------------------------------------*/
/*-------------------------------------------------*/

// Distribution
gulp.task('dist', ['scripts','styles']);

// Default
gulp.task('default', ['watch']);