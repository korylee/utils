"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.map = exports.mapSkip = void 0;
exports.mapSkip = Symbol("skip");
function map(iterable, mapper, thisArg) {
    var result = [];
    for (var i = 0; i < iterable.length; i++) {
        var item = iterable[i];
        var element = mapper.call(thisArg, item, i, iterable);
        if (element === exports.mapSkip)
            continue;
        result.push(element);
    }
    return result;
}
exports.map = map;
