interface Func<T = any, R = T> {
    (...args: T[]): R;
}
export declare const is: (val: unknown, type: string) => boolean;
export declare const isDef: <T = unknown>(val?: T | undefined) => val is T;
export declare const isUnDef: <T = unknown>(val?: T | undefined) => val is T;
export declare const isString: (val: unknown) => val is string;
export declare const isObject: (val: unknown) => val is Record<any, any>;
export declare const isFunction: (val: unknown) => val is Func<any, any>;
export declare const isDate: (val: unknown) => val is Date;
export declare const isNull: (val: unknown) => val is null;
export declare const isUndefined: (val: unknown) => val is undefined;
export declare const isNullOrUnDef: (val: unknown) => val is null | undefined;
export declare const isNumber: (val: unknown) => val is number;
export declare const isPromise: <T = any>(val: unknown) => val is Promise<T>;
export declare const isBoolean: (val: unknown) => val is boolean;
export declare const isRegExp: (val: unknown) => val is RegExp;
export declare const isArray: (val: any) => val is any[];
export declare const isUrl: (path: string) => boolean;
export {};
