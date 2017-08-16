'use strict';

const _ = require('lodash');
const del = require('del');

const gulp = require('gulp');
const watch = require('gulp-watch');
const logger = require('gulp-logger');
const gutil = require('gulp-util');
const babel = require('gulp-babel');
const eslint = require('gulp-eslint');
const filter = require('gulp-firstline-filter');
const config = require('./config');

let conf = config.get();

function setBabelConf() {
    conf = config.get();
    if (conf.useRequireJS) {
        conf.babelrc.plugins.push(
            'add-module-exports',
            'transform-es2015-modules-amd');
    }
}

function commonPipe(gulpSrc) {
    // Create filter instance inside task function
    const es6Filter = filter(conf.es6Pattern, { restore: true });
    const filterNotES6 = filter(_.negate(line => conf.es6Pattern.test(line)), { restore: true });
    return gulpSrc
        .pipe(es6Filter)
        .pipe(conf.verbose === true && conf.useLint === true ? logger({
            beforeEach: 'Starting linting (es6) ... ',
            afterEach: ' Linting complete!',
        }) : gutil.noop())
        .pipe(conf.useLint === true ? eslint(conf.lint.eslintrcES6) : gutil.noop())
        .pipe(conf.useLint === true ? eslint.formatEach() : gutil.noop())
        .pipe(conf.useLint === true && conf.lint.failAfterError === true ? eslint.failAfterError() : gutil.noop())
        .pipe(conf.verbose === true && conf.useBabel === true ? logger({
            beforeEach: 'Starting babelling... ',
            afterEach: ' Babelling complete!',
        }) : gutil.noop())
        .pipe(conf.useBabel === true ? babel(conf.babelrc) : gutil.noop())
        .pipe(es6Filter.restore)
        .pipe(filterNotES6)
        .pipe(conf.verbose === true && conf.useLint === true ? logger({
            beforeEach: 'Starting linting (es5) ... ',
            afterEach: ' Linting complete!',
        }) : gutil.noop())
        .pipe(conf.useLint === true ? eslint(conf.lint.eslintrcES5) : gutil.noop())
        .pipe(conf.useLint === true ? eslint.formatEach() : gutil.noop())
        .pipe(filterNotES6.restore)
        .pipe(gulp.dest(conf.getDestPath()));
}

gulp.task('config', () => setBabelConf());

gulp.task('clean', ['config'], () => del(conf.getDestPath()));

gulp.task('copy', ['config'], () => {
    gulp.src(conf.getSrcPath())
        .pipe(gulp.dest(conf.getDestPath()));
});

gulp.task('build:all', () => {
    del(conf.getDestPath())
        .then(() => commonPipe(gulp.src(conf.getSrcPath())));
});

gulp.task('watch:all', ['config', 'build:all'], () => commonPipe(watch(conf.getSrcPath())));

