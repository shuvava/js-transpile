const traspile = require('js-transpile');

traspile.run({
    config: {
        lint: {
            failAfterError: false,
        },
    }
});
