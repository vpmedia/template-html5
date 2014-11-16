var app = require('../../main/javascript/app');

exports.app = function (test) {
    test.equal(app, app);
    test.done();
};