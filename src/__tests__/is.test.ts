import { describe, expect, it } from "vitest";
import { isNumber, isString } from "../is";

describe("is type", () => {
  it("is string", () => {
    expect(isString(2)).toBe(false);
    expect(isString("1")).toBe(true);
  });
  it("is number", () => {
    expect(isNumber(0)).toBe(true);
    expect(isNumber(0.6)).toBe(true);
    expect(isNumber("0.6")).toBe(false);
    expect(isNumber({})).toBe(false);
  });
});
