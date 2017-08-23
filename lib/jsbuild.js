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
const flatten = require('gulp-flatten');
const minify = require('gulp-minify');
const mainBowerFiles = require('main-bower-files');
const Config = require('./config');

function iif(test, fn) {
    if (test) {
        return fn.apply(null, Array.prototype.slice.call(arguments,2)); // eslint-disable-line
    }
    return gutil.noop();
}

class JsBuild {
    constructor(settings) {
        this._config = new Config();
        this.config(settings);
    }
    config(settings) {
        this._config.set(settings);
        this.conf = this._config.get();
        if (this.conf.useRequireJS) {
            this.conf.babelrc.plugins.push(
                'add-module-exports',
                'transform-es2015-modules-amd');
        }
    }
    commonPipe(gulpSrc) {
        // Create filter instance inside task function
        const es6Filter = filter(this.conf.es6Pattern, { restore: true });
        const filterNotES6 = filter(_.negate(line => this.conf.es6Pattern.test(line)), { restore: true });
        return gulpSrc
            .pipe(es6Filter)
            .pipe(iif(this.conf.verbose === true && this.conf.useLint === true, logger, {
                beforeEach: 'Starting linting (es6) ... ',
                afterEach: ' Linting complete!',
            }))
            .pipe(iif(this.conf.useLint === true, eslint, this.conf.lint.eslintrcES6))
            .pipe(iif(this.conf.useLint === true, eslint.formatEach))
            .pipe(iif(this.conf.useLint === true && this.conf.lint.failAfterError === true, eslint.failAfterError))
            .pipe(iif(this.conf.verbose === true && this.conf.useBabel === true, logger, {
                beforeEach: 'Starting babelling... ',
                afterEach: ' Babelling complete!',
            }))
            .pipe(iif(this.conf.useBabel === true, babel, this.conf.babelrc))
            .pipe(es6Filter.restore)
            .pipe(filterNotES6)
            .pipe(iif(this.conf.verbose === true && this.conf.useLint === true, logger, {
                beforeEach: 'Starting linting (es5) ... ',
                afterEach: ' Linting complete!',
            }))
            .pipe(iif(this.conf.useLint === true, eslint, this.conf.lint.eslintrcES5))
            .pipe(iif(this.conf.useLint === true, eslint.formatEach))
            .pipe(filterNotES6.restore)
            .pipe(iif(this.conf.useFlatten, flatten))
            .pipe(iif(this.conf.useMinify, minify, this.conf.minify))
            .pipe(gulp.dest(this.conf.path.dest));
    }
    copy() {
        return gulp.src(this.conf.path.src)
            .pipe(gulp.dest(this.conf.path.dest));
    }
    copylibrary() {
        return gulp.src(mainBowerFiles(), this.conf.bower)
            .pipe(iif(this.conf.useFlatten, flatten))
            .pipe(iif(this.conf.useMinify, minify, this.conf.minify))
            .pipe(gulp.dest(this.conf.path.dest));
    }
    build() {
        return this.commonPipe(gulp.src(this.conf.path.src));
    }
    watch() {
        return this.commonPipe(watch(this.conf.path.src));
    }
    clean() {
        return del(this.conf.path.dest);
    }
}

module.exports = JsBuild;
