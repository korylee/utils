export default function awaitTo<T extends any, R extends undefined>(promise: Promise<T>, { errorExt, initialValue, }?: {
    errorExt?: any;
    initialValue?: R;
}): Promise<any[] | (T | null)[]>;
