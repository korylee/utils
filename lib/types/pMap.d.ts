export declare const pMapSkip: unique symbol;
export default function pMap<T extends Promise<any> | any, R extends any>(iterable: Iterable<T>, mapper: (item: T, index: number, items: Iterable<T>) => R, { concurrency, stopOnError, }?: {
    concurrency?: number;
    stopOnError?: boolean;
}): Promise<R[]>;
