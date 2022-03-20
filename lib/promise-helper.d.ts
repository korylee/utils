export declare const pMapSkip: unique symbol;
export declare function pMap<T extends Promise<any> | any, R extends any>(iterable: Iterable<T>, mapper: (item: T, index: number, items: Iterable<T>) => R, { concurrency, stopOnError, }?: {
    concurrency?: number;
    stopOnError?: boolean;
}): Promise<R[]>;
export declare function pAll<T extends Promise<any> | any>(iterable: Iterable<T>, { runInFunction, concurrency, stopOnError, }?: {
    runInFunction?: boolean | undefined;
    concurrency?: number | undefined;
    stopOnError?: boolean | undefined;
}): Promise<any[]>;
export declare function awaitTo<T extends any, R extends undefined>(promise: Promise<T>, { errorExt, initialValue, }?: {
    errorExt?: any;
    initialValue?: R;
}): Promise<any[] | (T | null)[]>;
