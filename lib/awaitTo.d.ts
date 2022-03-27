export declare function awaitTo<T extends any, R extends undefined>(promise: Promise<T>, { errorExt, initialValue, }?: {
    errorExt?: any;
    initialValue?: R;
}): Promise<any[] | (T | null)[]>;
export default awaitTo;
