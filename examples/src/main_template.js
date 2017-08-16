/* eslint-env es6 */

import $ from 'jquery';

class A {
    constructor(a) {
        this.className = 'A';
        console.log(`Hello ${a}!`); // eslint-disable-line no-console
    }
    test1(txt) {
        console.log(`${this.className}.test1 ${txt}!`); // eslint-disable-line no-console
    }
    test2(txt) {
        console.log(`${this.className}.test2 ${txt}!`); // eslint-disable-line no-console
    }
}
class B extends A {
    constructor(a) {
        super(a);
        this.className = 'B';
    }
    test1(txt) {
        txt = `${txt}_fromB`;
        super.test1(txt);
    }
}

const t = new A('world!'); // eslint-disable-line no-unused-vars
const t1 = new B('onother world!');
t1.test1('example');
$('#test').text('123');

