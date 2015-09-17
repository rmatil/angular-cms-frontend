'use strict';


// Load plugins
var gulp = require('gulp'),
    autoprefixer = require('gulp-autoprefixer'),
    minifycss = require('gulp-minify-css'),
    jshint = require('gulp-jshint'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    concat = require('gulp-concat'),
    notify = require('gulp-notify'),
    cache = require('gulp-cache'),
    del = require('del');

// Styles
gulp.task('styles', function () {
    return gulp.src(
        [
            'css/normalize.css',
            'css/main.css',
            'bower_components/ng-ckeditor/ng-ckeditor.css',
            'bower_components/rome/dist/rome.min.css',
            'bower_components/gToast/build/gToast.css',
            'bower_components/angular-loading-bar/build/loading-bar.min.css'
        ]
    ).pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
    .pipe(concat('main.css'))
    .pipe(gulp.dest('build/css'))
    .pipe(rename({suffix: '.min'}))
    .pipe(minifycss())
    .pipe(gulp.dest('build/css'))
    .pipe(notify({message: 'Styles task complete'}));
});

// Scripts
gulp.task('scripts', function () {
    return gulp.src(
        [
            'bower_components/angular/angular.js',
            'bower_components/angular-sanitize/angular-sanitize.min.js',
            'bower_components/angular-route/angular-route.min.js',
            'bower_components/angular-cookies/angular-cookies.min.js',
            'bower_components/ng-file-upload/ng-file-upload.min.js',
            'bower_components/ng-file-upload/ng-file-upload-shim.min.js',
            'bower_components/moment/min/moment.min.js',
            'bower_components/angular-momentjs/angular-momentjs.min.js',
            'bower_components/raphael/raphael-min.js',
            'bower_components/rome/dist/rome.standalone.min.js',
            'bower_components/gToast/build/gToast.js',
            'bower_components/angular-loading-bar/build/loading-bar.min.js',

            'components/app.modules.js',
            'components/*/*Service.js',
            'components/status-bar/loadingQueue.js',
            'components/navigation/navigation.js',
            'components/status-bar/statusBar.js',
            'components/event-dashboard/eventGraphDirective.js',
            'components/delete/deleteDirective.js',
            'components/login/logoutDirective.js',
            'components/dashboard/dashboardDirective.js',
            'components/*/*Controller.js',
            'components/app.js'
        ]
    ).pipe(jshint.reporter('default'))
    .pipe(concat('app.js'))
    .pipe(gulp.dest('build/js'))
    .pipe(rename({suffix: '.min'}))
    .pipe(uglify())
    .pipe(gulp.dest('build/js'))
    .pipe(notify({message: 'Scripts task complete'}));
});

// Copy fonts from a module outside of our project (like Bower)
gulp.task('copyfiles', function () {
    gulp.src('fonts/*')
        .pipe(gulp.dest('build/fonts'));
});

// Default task
gulp.task('default', function () {
    gulp.start('styles', 'scripts', 'copyfiles');
});