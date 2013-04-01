make-async
==========

Allows writing simple synchronous function an use them later as asynchronous.

Sometimes, code written in syncronous style looks better, but when you need to use it as asynchronous function, you always need to check for callback presence, manage, when to return result — schedule with `process.nextTick()`, `setImmediate`, or call it directly.

`make-async` takes this problem away, and you can write bunch of simple synchronous functions, that return result or error as an instance of `Error` class. Moreover, when you wrap your synchronous functions, you can specify when callback should be called (see "When to call back" section).

## Installation

    npm install make-async
    
## Usage

    // Require make-async
    var makeAsync = require('make-async'),
        asyncSum;
    
    // Synchronous function to wrap
    function sum(a, b) {
        return a + b;
    }
    
    // Wrap our synchronous function
    asyncSum = makeAsync(sum);
    
    // When we call it
    asyncSum(1, 2, function (err, result) {
        // err will be null
        // result will equal to 3
    });

### Dealing with errors
If wrapped sync function returns an instance of `Error`, it will be passed as first argument to provided callback.

    // Require make-async
    var makeAsync = require('make-async'),
        asyncErrorFunc;
        
    function errorFunc() {
        return new Error('Some error');
    }
    
    asyncErrorFunc = makeAsync(errorFunc);
    
    asyncErrorFunc(function (err, result) {
        // err will be instance of Error returned from sync function
        // result will be null
    });

### When to call back

There is optional second argument to `makeAsync` that determines, when callback function will be actually called. Possible values are:

* 'immediate' (default) — callback will be called using `setImmediate` function provided by node v0.10. If setImmediate is not defined, if will fall back to 'nextTick'.
* 'nextTick' — callback will be called using `process.nextTick()`
* 'direct' — callback will be called immediately

## 'this' variable

Don't rely on `this` variable in your functions — makeAsync calls your functions with `null` value as `this` value. Just write functions which rely only on their arguments to produce return.

## Tests

Tests are written in `mocha`, and placed in `/test` folder. To run them, just call mocha in shell.

    $ mocha

