var app = require('../src/app');

exports.app = function (test) {
    test.equal(app, app);
    test.done();
};