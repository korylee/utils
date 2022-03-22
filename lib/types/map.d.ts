export declare const mapSkip: unique symbol;
export declare function map<T, U extends any>(iterable: T[], mapper: (value: T, index: number, array: T[]) => U, thisArg?: any): U[];
