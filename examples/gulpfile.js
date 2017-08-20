const JsBuild = require('js-transpile');
const gulp = require('gulp');

const jsbuild = new JsBuild({
    lint: {
        failAfterError: false,
    },
});
const jsLibs = new JsBuild({
    path: {
        dest: '/libs',
    },
    useMinify: true,
    useFlatten: true,
});


gulp.task('build', () => {
    jsbuild.build();
});

gulp.task('copy:libraries', () => {
    jsLibs.copylibrary();
});
