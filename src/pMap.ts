export const pMapSkip = Symbol("skip");

export  async function pMap<T extends Promise<any> | any, R extends any>(
  iterable: Iterable<T>,
  mapper: (item: T, index: number, items: Iterable<T>) => R,
  {
    concurrency = Number.POSITIVE_INFINITY,
    stopOnError = true,
  }: {
    concurrency?: number; //—— 并发数，默认值 Infinity，最小值为 1；
    stopOnError?: boolean; //出现异常时，是否终止，默认值为 true。
  } = {}
): Promise<R[]> {
  return new Promise((resolve, reject) => {
    const result: R[] = [];
    const errors:Error[] = [];
    const skippedIndexes:number[] = [];
    const iterator = iterable[Symbol.iterator]();
    let isRejected = false;
    let isIterableDone = false;
    let resolvingCount = 0;
    let currentIndex = 0;

    const next = () => {
      if (isRejected) return;
      const nextItem = iterator.next();
      const index = currentIndex;
      currentIndex++;
      if (nextItem.done) {
        isIterableDone = true;
        if (resolvingCount === 0) {
          if (stopOnError && errors.length > 0) {
            reject(errors);
          } else {
            skippedIndexes.sort((a, b) => b - a);
            for (const skippedIndex of skippedIndexes) {
              result.splice(skippedIndex, 1);
            }
            resolve(result);
          }
        }
        return;
      }
      resolvingCount++;
      (async () => {
        try {
          const element = await nextItem.value;
          if (isRejected) return;
          const value = await mapper(element, index, iterable);
          if (value === pMapSkip) {
            skippedIndexes.push(index);
          } else {
            result[index] = value;
          }

          resolvingCount--;
          next();
        } catch (e) {
          if (stopOnError) {
            isRejected = true;
            reject(e);
          } else {
            errors.push(e as Error);
            resolvingCount--;
            next();
          }
        }
      })();
    };
    for (let index = 0; index < concurrency; index++) {
      next();
      if (isIterableDone) break;
    }
  });
}

export default pMap;