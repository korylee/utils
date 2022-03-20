export default class LRUCache<T, R> {
    $cache: Map<T, R>;
    $capacity: number;
    constructor(capacity: number, cache?: Map<any, any>);
    get(key: T): R | void;
    put(key: T, value: R): void;
}
