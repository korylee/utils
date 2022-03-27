"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LruCache = void 0;
var LruCache = /** @class */ (function () {
    function LruCache(capacity, cache) {
        if (cache === void 0) { cache = new Map(); }
        this.$cache = cache;
        this.$capacity = capacity;
    }
    LruCache.prototype.get = function (key) {
        var temp = this.$cache.get(key);
        if (temp) {
            this.$cache.delete(key);
            this.$cache.set(key, temp);
            return temp;
        }
        return undefined;
    };
    LruCache.prototype.put = function (key, value) {
        if (this.$cache.has(key))
            this.$cache.delete(key);
        else if (this.$cache.size >= this.$capacity) {
            this.$cache.delete(this.$cache.keys().next().value);
        }
        this.$cache.set(key, value);
    };
    return LruCache;
}());
exports.LruCache = LruCache;
exports.default = LruCache;
