var assert = require('assert'),
    makeAsync = require('../makeAsync'),
    successfulFunction = function (a, b) { return a + b; },
    errorFunction = function (a, b) { return new Error('Some error'); };

describe('makeAsync can take correct synchronous function', function () {
    var asyncSuccessfulFunction = makeAsync(successfulFunction, "direct");
        
    it('and produce function', function () {
        assert.equal(typeof asyncSuccessfulFunction, 'function');
    });

    describe('that takes same arguments plus callback', function () {
        var functionResult = null;
        before(function (done) {
            asyncSuccessfulFunction(1, 2, function (err, result) {
                assert(!err);
                assert(result);
                functionResult = result;
                done();
            });
        });
        it('and return value withour error', function () {
            assert.equal(functionResult, 3);
        });
    });
});

describe('makeAsync can take errornous synchronous function', function () {
    var asyncErrorFunction = makeAsync(errorFunction, "direct");
        
    it('and produce function', function () {
        assert.equal(typeof asyncErrorFunction, 'function');
    });

    describe('that takes same arguments plus callback', function () {
        var functionError = null;
        before(function (done) {
            asyncErrorFunction(1, 2, function (err, result) {
                assert(err);
                assert(!result);
                functionError = err;
                done();
            });
        });
        it('and calls callback with error', function () {
            assert(functionError instanceof Error);
        });
    });
});
