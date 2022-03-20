export default class LRUCache<T, R> {
  $cache: Map<T, R>
  $capacity: number

  constructor(capacity: number, cache = new Map()) {
    this.$cache = cache
    this.$capacity = capacity
  }

  get(key: T): R | void {
    const temp = this.$cache.get(key)
    if (temp) {
      this.$cache.delete(key)
      this.$cache.set(key, temp)
      return temp
    }
    return undefined
  }

  put(key: T, value: R): void {
    if (this.$cache.has(key)) this.$cache.delete(key)
    else if (this.$cache.size >= this.$capacity) {
      this.$cache.delete(this.$cache.keys().next().value)
    }
    this.$cache.set(key, value)
  }
}
