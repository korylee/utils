"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var LRUCache = /** @class */ (function () {
    function LRUCache(capacity, cache) {
        if (cache === void 0) { cache = new Map(); }
        this.$cache = cache;
        this.$capacity = capacity;
    }
    LRUCache.prototype.get = function (key) {
        var temp = this.$cache.get(key);
        if (temp) {
            this.$cache.delete(key);
            this.$cache.set(key, temp);
            return temp;
        }
        return undefined;
    };
    LRUCache.prototype.put = function (key, value) {
        if (this.$cache.has(key))
            this.$cache.delete(key);
        else if (this.$cache.size >= this.$capacity) {
            this.$cache.delete(this.$cache.keys().next().value);
        }
        this.$cache.set(key, value);
    };
    return LRUCache;
}());
exports.default = LRUCache;
