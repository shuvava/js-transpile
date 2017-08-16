'use strict';

const gulp = require('gulp');
const globalConfig = require('./lib/config');
require('./lib/gulp.tasks');

class GulpBase {
    static run(config, task) {
        globalConfig.set(config);
        gulp.start(task || 'watch:all');
    }
    static config(config) {
        globalConfig.set(config);
    }
}

module.exports = GulpBase;
