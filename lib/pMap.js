"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.pMapSkip = void 0;
exports.pMapSkip = Symbol("skip");
function pMap(iterable, mapper, _a) {
    var _b = _a === void 0 ? {} : _a, _c = _b.concurrency, concurrency = _c === void 0 ? Number.POSITIVE_INFINITY : _c, _d = _b.stopOnError, stopOnError = _d === void 0 ? true : _d;
    return __awaiter(this, void 0, void 0, function () {
        var _this = this;
        return __generator(this, function (_e) {
            return [2 /*return*/, new Promise(function (resolve, reject) {
                    var result = [];
                    var errors = [];
                    var skippedIndexes = [];
                    var iterator = iterable[Symbol.iterator]();
                    var isRejected = false;
                    var isIterableDone = false;
                    var resolvingCount = 0;
                    var currentIndex = 0;
                    var next = function () {
                        if (isRejected)
                            return;
                        var nextItem = iterator.next();
                        var index = currentIndex;
                        currentIndex++;
                        if (nextItem.done) {
                            isIterableDone = true;
                            if (resolvingCount === 0) {
                                if (stopOnError && errors.length > 0) {
                                    reject(errors);
                                }
                                else {
                                    skippedIndexes.sort(function (a, b) { return b - a; });
                                    for (var _i = 0, skippedIndexes_1 = skippedIndexes; _i < skippedIndexes_1.length; _i++) {
                                        var skippedIndex = skippedIndexes_1[_i];
                                        result.splice(skippedIndex, 1);
                                    }
                                    resolve(result);
                                }
                            }
                            return;
                        }
                        resolvingCount++;
                        (function () { return __awaiter(_this, void 0, void 0, function () {
                            var element, value, e_1;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        _a.trys.push([0, 3, , 4]);
                                        return [4 /*yield*/, nextItem.value];
                                    case 1:
                                        element = _a.sent();
                                        if (isRejected)
                                            return [2 /*return*/];
                                        return [4 /*yield*/, mapper(element, index, iterable)];
                                    case 2:
                                        value = _a.sent();
                                        if (value === exports.pMapSkip) {
                                            skippedIndexes.push(index);
                                        }
                                        else {
                                            result[index] = value;
                                        }
                                        resolvingCount--;
                                        next();
                                        return [3 /*break*/, 4];
                                    case 3:
                                        e_1 = _a.sent();
                                        if (stopOnError) {
                                            isRejected = true;
                                            reject(e_1);
                                        }
                                        else {
                                            errors.push(e_1);
                                            resolvingCount--;
                                            next();
                                        }
                                        return [3 /*break*/, 4];
                                    case 4: return [2 /*return*/];
                                }
                            });
                        }); })();
                    };
                    for (var index = 0; index < concurrency; index++) {
                        next();
                        if (isIterableDone)
                            break;
                    }
                })];
        });
    });
}
exports.default = pMap;