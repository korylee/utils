"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.wrapInArray = void 0;
var is_1 = require("./is");
function wrapInArray(v) {
    if ((0, is_1.isNull)(v) || (0, is_1.isUndefined)(v))
        return [];
    return Array.isArray(v) ? v : [v];
}
exports.wrapInArray = wrapInArray;
