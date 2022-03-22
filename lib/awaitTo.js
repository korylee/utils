"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function awaitTo(promise, _a) {
    var _b = _a === void 0 ? {} : _a, _c = _b.errorExt, errorExt = _c === void 0 ? {} : _c, _d = _b.initialValue, initialValue = _d === void 0 ? undefined : _d;
    return promise
        .then(function (data) { return [null, data]; })
        .catch(function (err) {
        if (errorExt)
            Object.assign(err, errorExt);
        return [err, initialValue];
    });
}
exports.default = awaitTo;
