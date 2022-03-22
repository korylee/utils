export { pMapSkip as pAllSkip } from "./pMap";
export default function pAll<T extends Promise<any> | any>(iterable: Iterable<T>, { runInFunction, concurrency, stopOnError }?: {
    runInFunction?: boolean | undefined;
    concurrency?: number | undefined;
    stopOnError?: boolean | undefined;
}): Promise<any[]>;
