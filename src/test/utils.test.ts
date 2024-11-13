import { roundOff, roundDown, roundUp } from "../utils";

test("roundOff", () => {
  expect(roundOff(0.123456, 1)).toBe(12.3);
  expect(roundOff(0.123456, 2)).toBe(12.35);
});

test("roundDown", () => {
  expect(roundDown(0.123456, 1)).toBe(12.3);
  expect(roundDown(0.123456, 2)).toBe(12.34);
});

test("roundUp", () => {
  expect(roundUp(0.123456, 1)).toBe(12.4);
  expect(roundUp(0.123456, 2)).toBe(12.35);
});
