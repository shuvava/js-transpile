const JsBuild = require('js-transpile');
const gulp = require('gulp');

const LIBS_PATH = './libs';
const APPS_SRC_PATH = './src/**/*.js';
const APPS_DEST_PATH = './dist';

// set a variable telling us if we're building in release
var isRelease = false;
if (process.env.NODE_ENV && process.env.NODE_ENV === 'Release') {
    isRelease = true;
}

const jsLibs = new JsBuild({
    path: {
        dest: LIBS_PATH,
        src: '',
    },
    useMinify: isRelease,
    useFlatten: true,
});

const jsbuild = new JsBuild({
    path: {
        src: APPS_SRC_PATH,
        dest: APPS_DEST_PATH,
    },
    lint: {
        failAfterError: false,
    },
    useMinify: isRelease,
});

gulp.task('cleanup-apps', () => jsbuild.clean());
gulp.task('cleanup-libs', () => jsLibs.clean());

gulp.task('copy-libraries', ['cleanup-libs'], () => jsLibs.copylibrary());

gulp.task('build', ['cleanup-apps'], () => jsbuild.build());

gulp.task('transpile', ['build'], () => {
    const jsTranspile = new JsBuild({
        path: {
            src: APPS_SRC_PATH,
            dest: APPS_DEST_PATH,
        },
        lint: {
            failAfterError: false,
        },
    });
    return jsTranspile.watch();
});