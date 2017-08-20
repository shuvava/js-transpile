'use strict';

const Path = require('path');

const defaultConfig = Object.freeze({
    path: {
        src: '/src/**/*.js',
        dest: '/dist',
    },
    _appDir: Path.dirname(require.main.filename),
    verbose: true,
    useRequireJS: true,
    es6Pattern: /^((\/\/|\/\*)\s*[\w\-]+\s+(esversion:\s*6|es6)\s*)/,
    useBabel: true,
    babelrc: {
        presets: ['env'],
        sourceMaps: 'inline',
        plugins: [],
    },
    useLint: true,
    lint: {
        failAfterError: true,
        eslintrcES6: {
            useEslintrc: false,
            configFile: Path.join(__dirname, './libs/eslintrc-es6.js'),
        },
        eslintrcES5: {
            useEslintrc: false,
            warnFileIgnored: true,
            configFile: Path.join(__dirname, './libs/eslintrc-es5.js'),
            parserOptions: {
                ecmaVersion: 5,
            },
        },
    },
    useMinify: false,
    minify: {
        ext: {
            src: '.js',
            min: '.js',
        },
        noSource: true,
    },
    useFlatten: false,
    bower: { base: './bower_components' },
});

class Config {
    constructor(settings) {
        this.set(settings);
    }
    getSrcPath() {
        return Path.join(this.config._appDir, this.config.path.src);
    }
    getDestPath() {
        return Path.join(this.config._appDir, this.config.path.dest);
    }
    set(settings) {
        this.config = Object.assign({}, defaultConfig, settings);
    }
    get() {
        const conf = Object.assign({}, this.config);
        conf.path.src = this.getSrcPath();
        conf.path.dest = this.getDestPath();
        return conf;
    }
}

module.exports = Config;
