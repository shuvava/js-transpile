/* global requirejs */
requirejs.config({
    name: 'init',
    optimize: 'none',
    // By default load any module IDs from RequireJS
    baseUrl: 'libs',
    paths: {
        'jquery': 'https://ajax.googleapis.com/ajax/libs/jquery/3.0.0/jquery.min',
        'jquery-ui': 'https://ajax.googleapis.com/ajax/libs/jqueryui/1.11.4/jquery-ui.min',
        'bootstrap': 'bootstrap/dist/js/bootstrap',
        'knockout': 'knockout/build/output/knockout-latest.debug',
        'lodash': 'lodash/lodash',
        'app': '../dist',
    },
    shim: {
        'bootstrap': {
            deps: ['jquery'],
            exports: 'Bootstrap',
        },
        'jqueryUI': {
            deps: ['jquery'],
            exports: 'jQueryUI',
        },
    },
});
