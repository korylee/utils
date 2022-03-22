export const mapSkip = Symbol("skip");

export function map<T, U extends any>(
  iterable: T[],
  mapper: (value: T, index: number, array: T[]) => U,
  thisArg?: any
) {
  const result = [];
  for (let i = 0; i < iterable.length; i++) {
    const item = iterable[i];
    const element = mapper.call(thisArg, item, i, iterable);
    if (element === mapSkip) continue;
    result.push(element);
  }
  return result;
}
