const Path = require('path');

let config;

class Config {
    constructor() {
        this.path = {
            src: '/src/**/*.js',
            dest: '/dist',
        };
        this._appDir = Path.dirname(require.main.filename);
        this.verbose = true;
        this.useRequireJS = true;
        this.es6Pattern = /^((\/\/|\/\*)\s*[\w\-]+\s+(esversion:\s*6|es6)\s*)/;
        this.useBabel = true;
        this.babelrc = {
            presets: ['env'],
            sourceMaps: 'inline',
            plugins: [],
        };
        this.useLint = true;
        this.lint = {
            failAfterError: true,
            eslintrcES6: {
                useEslintrc: false,
                configFile: Path.join(Path.resolve(Path.dirname('')), 'lib/eslintrc-es6.js'),
            },
            eslintrcES5: {
                useEslintrc: false,
                warnFileIgnored: true,
                configFile: Path.join(Path.resolve(Path.dirname('')), 'lib/eslintrc-es5.js'),
                parserOptions: {
                    ecmaVersion: 5,
                },
            },
        };
    }
    getSrcPath() {
        return Path.join(this._appDir, this.path.src);
    }
    getDestPath() {
        return Path.join(this._appDir, this.path.dest);
    }
    static set(settings) {
        const conf = Object.assign(new Config(), settings);
        config = Object.freeze(conf);
    }
    static get() {
        return config;
    }
}

Config.set();

module.exports = Config;
