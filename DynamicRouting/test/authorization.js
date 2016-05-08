var assert = require('chai').assert;
var auth = require('../modules/security/authorization.js');
describe('authorization', function () {
    it('Should return true for valid credentials', function () {
        var result = auth.authorize({
            clientId: 'oscar-marin', signature: 'sample-signature', date: ((new Date).getTime())
        });
        console.log(result);
        assert.equal(true, result);
    });
    it('Should return false if the date has past 15 minutes', function () {
        var current = ((new Date).getTime()) - (1000 * (30 * 60));
        var result = auth.authorize({
            clientId: 'oscar-marin', signature: 'sample-signature', date: current
        });
        console.log(result);
        assert.equal(false, result);
    });
});