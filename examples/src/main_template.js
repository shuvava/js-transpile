/* eslint-env es6 */

import $ from 'jquery';

class A {
    constructor(a) {
        console.log(`Hello ${a}!`); // eslint-disable-line no-console
    }
}

const t = new A('world!'); // eslint-disable-line no-unused-vars

$('#test').text('123');

