const gulp = require('gulp');
const globalConfig = require('./lib/config');
require('./lib/gulp.tasks');

class GulpBase {
    static run({ config, task } = {}) {
        globalConfig.set(config);
        gulp.start(task || 'watch:all');
    }
}

module.exports = GulpBase;
