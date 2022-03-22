import { isFunction } from "./is";
import pMap from "./pMap";

export { pMapSkip as pAllSkip } from "./pMap";
export default async function pAll<T extends Promise<any> | any>(
  iterable: Iterable<T>,
  { runInFunction = true, concurrency = Number.POSITIVE_INFINITY, stopOnError = true } = {}
) {
  return pMap(
    iterable,
    (element) => {
      if (!runInFunction) return element;
      return isFunction(element) ? element() : element;
    },
    { concurrency, stopOnError }
  );
}
