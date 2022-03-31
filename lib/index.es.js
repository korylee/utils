function awaitTo(promise, {
  errorExt = {},
  initialValue = void 0
} = {}) {
  return promise.then((data) => [null, data]).catch((err) => {
    if (errorExt)
      Object.assign(err, errorExt);
    return [err, initialValue];
  });
}
const toString = Object.prototype.toString;
const is = (val, type) => toString.call(val) === `[object ${type}]`;
const isDef = (val) => typeof val !== "undefined";
const isUnDef = (val) => !isDef(val);
const isString = (val) => is(val, "String");
const isObject = (val) => val !== null && is(val, "Object");
const isFunction = (val) => typeof val === "function";
const isDate = (val) => is(val, "Date");
const isNull = (val) => val === null;
const isUndefined = (val) => val === void 0;
const isNullOrUnDef = (val) => isUndefined(val) || isNull(val);
const isNumber = (val) => is(val, "Number");
const isPromise = (val) => is(val, "Promise") && isObject(val) && isFunction(val.then) && isFunction(val.catch);
const isBoolean = (val) => is(val, "Boolean");
const isRegExp = (val) => is(val, "RegExp");
const isArray = (val) => val && Array.isArray(val);
const isUrl = (path) => {
  const reg = /(((^https?:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+(?::\d+)?|(?:www.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%\/.\w-_]*)?\??(?:[-+=&;%@.\w_]*)#?(?:[\w]*))?)$/;
  return reg.test(path);
};
class LruCache {
  constructor(capacity, cache = /* @__PURE__ */ new Map()) {
    this.$cache = cache;
    this.$capacity = capacity;
  }
  get(key) {
    const temp = this.$cache.get(key);
    if (temp) {
      this.$cache.delete(key);
      this.$cache.set(key, temp);
      return temp;
    }
    return void 0;
  }
  put(key, value) {
    if (this.$cache.has(key))
      this.$cache.delete(key);
    else if (this.$cache.size >= this.$capacity) {
      this.$cache.delete(this.$cache.keys().next().value);
    }
    this.$cache.set(key, value);
  }
}
const mapSkip = Symbol("skip");
function map(iterable, mapper, thisArg) {
  const result = [];
  for (let i = 0; i < iterable.length; i++) {
    const item = iterable[i];
    const element = mapper.call(thisArg, item, i, iterable);
    if (element === mapSkip)
      continue;
    result.push(element);
  }
  return result;
}
const pMapSkip = Symbol("skip");
async function pMap(iterable, mapper, {
  concurrency = Number.POSITIVE_INFINITY,
  stopOnError = true
} = {}) {
  return new Promise((resolve, reject) => {
    const result = [];
    const errors = [];
    const skippedIndexes = [];
    const iterator = iterable[Symbol.iterator]();
    let isRejected = false;
    let isIterableDone = false;
    let resolvingCount = 0;
    let currentIndex = 0;
    const next = () => {
      if (isRejected)
        return;
      const nextItem = iterator.next();
      const index = currentIndex;
      currentIndex++;
      if (nextItem.done) {
        isIterableDone = true;
        if (resolvingCount === 0) {
          if (stopOnError && errors.length > 0) {
            reject(errors);
          } else {
            skippedIndexes.sort((a, b) => b - a);
            for (const skippedIndex of skippedIndexes) {
              result.splice(skippedIndex, 1);
            }
            resolve(result);
          }
        }
        return;
      }
      resolvingCount++;
      (async () => {
        try {
          const element = await nextItem.value;
          if (isRejected)
            return;
          const value = await mapper(element, index, iterable);
          if (value === pMapSkip) {
            skippedIndexes.push(index);
          } else {
            result[index] = value;
          }
          resolvingCount--;
          next();
        } catch (e) {
          if (stopOnError) {
            isRejected = true;
            reject(e);
          } else {
            errors.push(e);
            resolvingCount--;
            next();
          }
        }
      })();
    };
    for (let index = 0; index < concurrency; index++) {
      next();
      if (isIterableDone)
        break;
    }
  });
}
function wrapInArray(v) {
  if (isNull(v) || isUndefined(v))
    return [];
  return Array.isArray(v) ? v : [v];
}
export { LruCache, awaitTo, is, isArray, isBoolean, isDate, isDef, isFunction, isNull, isNullOrUnDef, isNumber, isObject, isPromise, isRegExp, isString, isUnDef, isUndefined, isUrl, map, mapSkip, pMap, pMapSkip, wrapInArray };
