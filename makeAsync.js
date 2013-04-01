"use strict";
module.exports = function (syncFunc, whenToCallBack) {
    whenToCallBack = whenToCallBack || "immediate";
    return function () {
        var args = Array.prototype.slice.call(arguments),
            // Last argument is a callback
            callback = args.pop(),
            syncFuncResult,
            error,
            result;
        if (!callback || !(typeof callback === "function")) {
            return new Error('makeAsync – last argument should be a callback');
        }
        syncFuncResult = syncFunc.apply(null, args);
        error = syncFuncResult instanceof Error ? syncFuncResult : null;
        result = syncFuncResult instanceof Error ? null : syncFuncResult;
        if (whenToCallBack === "immediate") {
            if (!setImmediate) {
                whenToCallBack = "nextTick";
            } else {
                setImmediate(
                    callback.bind(
                        null,
                        error,
                        result
                    )
                );
            }
        }
        if (whenToCallBack === "nextTick") {
            process.nextTick(
                callback.bind(
                    null,
                    error,
                    result
                )
            );
        }
        if (whenToCallBack === "direct") {
            callback(error, result);
        }
    };
}
