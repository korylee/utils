import { isNull, isUndefined } from "./is";

export function wrapInArray<T>(v: T | T[] | null | undefined): T[] {
  if (isNull(v) || isUndefined(v)) return [];
  return Array.isArray(v) ? v : [v];
}

export default wrapInArray;
