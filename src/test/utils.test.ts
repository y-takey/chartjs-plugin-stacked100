import { round } from "../utils";

test("round", () => {
  expect(round(0.123456, 1)).toBe(12.3)
  expect(round(0.123456, 2)).toBe(12.35)
});
