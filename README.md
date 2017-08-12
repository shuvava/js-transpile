# js-transpiler
Simple automatization script of linting and babeling es6 files

this automatization script :
* copy all js files into destination filder
* check syntax using [eslint-config-airbnb-base](https://github.com/airbnb/javascript) 
* babel es6
## Install

```
$ npm install --save-dev js-transpiler
```

## Usage

### Base example
Copy all files from folder /src to foloder /dist
if file has in first line eslint envinronment variable es6, this file will be babeled

es6 script example
```js
/* eslint-env es6 */

import $ from 'jquery';

class A {
    constructor(a) {
        console.log(`Hello ${a}!`); // eslint-disable-line no-console
    }
}
```
```js
const traspile = require('js-transpile');
traspile.run();
```

## API

### run([options])
run automatization task

#### options

Type: `Object`

##### options.path

Type: `Object`

###### options.path.src

 Type `string` source path of js files

###### options.path.dest
  Type `string` destination path of js files

##### options.useRequireJS
  Type `bool` add into babel requirejs modules
##### options.es6Pattern
  Type `RegExp` es6 files check pattern
##### options.useBabel
  Type `bool` allow babel using
##### options.useLint
  Type `bool` allow eslint using