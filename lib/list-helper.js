"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.map = exports.mapSkip = exports.wrapInArray = void 0;
var is_1 = require("./is");
function wrapInArray(v) {
    if ((0, is_1.isNull)(v) || (0, is_1.isUndefined)(v))
        return [];
    return Array.isArray(v) ? v : [v];
}
exports.wrapInArray = wrapInArray;
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
