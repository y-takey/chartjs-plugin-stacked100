import { summarizeValues, defaultStackKey } from "../plugin";

const allVisibles = [1, 1, 1, 1];

describe("summarizeValues", () => {
  describe("no stack group", () => {
    const datasets = [
      { data: [1, 5], label: "dummy1" },
      { data: [4, 2], label: "dummy2" },
    ];

    test("relative", () => {
      expect(summarizeValues(datasets, allVisibles, true, false)).toEqual([
        { [defaultStackKey]: 1 + 4 },
        { [defaultStackKey]: 5 + 2 },
      ]);
    });

    test("individual", () => {
      expect(summarizeValues(datasets, allVisibles, true, true)).toEqual([
        { [defaultStackKey]: Math.max(1, 4) },
        { [defaultStackKey]: Math.max(5, 2) },
      ]);
    });
  });

  describe("stack group", () => {
    const datasets = [
      { stack: "a", data: [1, 8] },
      { stack: "a", data: [7, 2] },
      { stack: "b", data: [3, 6] },
      { stack: "b", data: [5, 4] },
    ];

    test("relative", () => {
      expect(summarizeValues(datasets, allVisibles, true, false)).toEqual([
        { a: 1 + 7, b: 3 + 5 },
        { a: 8 + 2, b: 6 + 4 },
      ]);
    });

    // TODO: for #59
    test("individual", () => {
      expect(summarizeValues(datasets, allVisibles, true, false)).toEqual([
        { a: Math.max(1, 7), b: Math.max(3, 5) },
        { a: Math.max(8, 2), b: Math.max(6, 4) },
      ]);
    });
  });
});
