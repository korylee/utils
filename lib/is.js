"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isUrl = exports.isArray = exports.isRegExp = exports.isBoolean = exports.isPromise = exports.isNumber = exports.isNullOrUnDef = exports.isUndefined = exports.isNull = exports.isDate = exports.isFunction = exports.isObject = exports.isString = exports.isUnDef = exports.isDef = exports.is = void 0;
var toString = Object.prototype.toString;
var is = function (val, type) { return toString.call(val) === "[object ".concat(type, "]"); };
exports.is = is;
var isDef = function (val) { return typeof val !== 'undefined'; };
exports.isDef = isDef;
var isUnDef = function (val) { return !(0, exports.isDef)(val); };
exports.isUnDef = isUnDef;
var isString = function (val) { return (0, exports.is)(val, 'String'); };
exports.isString = isString;
var isObject = function (val) {
    return val !== null && (0, exports.is)(val, 'Object');
};
exports.isObject = isObject;
var isFunction = function (val) { return typeof val === 'function'; };
exports.isFunction = isFunction;
var isDate = function (val) { return (0, exports.is)(val, 'Date'); };
exports.isDate = isDate;
var isNull = function (val) { return val === null; };
exports.isNull = isNull;
var isUndefined = function (val) { return val === undefined; };
exports.isUndefined = isUndefined;
var isNullOrUnDef = function (val) {
    return (0, exports.isUndefined)(val) || (0, exports.isNull)(val);
};
exports.isNullOrUnDef = isNullOrUnDef;
var isNumber = function (val) { return (0, exports.is)(val, 'Number'); };
exports.isNumber = isNumber;
var isPromise = function (val) {
    return (0, exports.is)(val, 'Promise') && (0, exports.isObject)(val) && (0, exports.isFunction)(val.then) && (0, exports.isFunction)(val.catch);
};
exports.isPromise = isPromise;
var isBoolean = function (val) { return (0, exports.is)(val, 'Boolean'); };
exports.isBoolean = isBoolean;
var isRegExp = function (val) { return (0, exports.is)(val, 'RegExp'); };
exports.isRegExp = isRegExp;
var isArray = function (val) { return val && Array.isArray(val); };
exports.isArray = isArray;
var isUrl = function (path) {
    var reg = /(((^https?:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+(?::\d+)?|(?:www.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%\/.\w-_]*)?\??(?:[-+=&;%@.\w_]*)#?(?:[\w]*))?)$/;
    return reg.test(path);
};
exports.isUrl = isUrl;
