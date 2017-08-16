# js-transpiler
Simple automatization script of linting and babeling es6 files

this automatization script :
* copy all js files into destination folder
* check syntax using [eslint-config-airbnb-base](https://github.com/airbnb/javascript) 
* babel es6
## Install

```
$ npm install --save-dev js-transpiler
```

## Usage

### Base example
Copy all files from folder /src to folder /dist
if file has in first line eslint environment variable es6, this file will be babeled

es6 script to transpile
```js
/* eslint-env es6 */

import $ from 'jquery';

class A {
    constructor(a) {
        console.log(`Hello ${a}!`); // eslint-disable-line no-console
    }
}
```
gulpfile.js example
```js
const traspiler = require('js-transpiler');
traspiler.run({
        path: {
            src: './src/**/*.js', // glob with source files to transpile
            dest: './dist', // destination folder
        },
        lint: {
            failAfterError: false,
        },
    });
```
cmd/sh
```cmd
gulp 
```
result of transpiling 
```js
define(['jquery'], function (_jquery) {
    'use strict';
  ....
));
```

## API

### run([options])
run automatization task

#### options
Type: `Object`
##### options.path
Type: `Object`
###### options.path.src
Type `String|Array<String>` source path of js files 
###### options.path.dest
Type `string` destination path of js files
##### options.useRequireJS
Type `bool` add into babel requirejs modules. This options adds add-module-exports and transform-es2015-modules-amd plugins
##### options.es6Pattern
Type `RegExp` es6 files check pattern
##### options.useBabel
Type `bool` allow babel using
##### options.babelrc
Type `Object` babel settings
###### options.babelrc.presets
Type `Array<String>` default perset ['env']
###### options.babelrc.plugins
Type `Array<String>` list of plugins. All plugins should be installed in system 
##### options.useLint
Type `bool` allow eslint using
##### options.lint
Type `Object` eslint settings
###### options.lint.failAfterError
Type `bool` if true babeling raise error if file has linting errors
