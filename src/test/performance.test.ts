import { ChartData } from "chart.js";
import { summarizeValues, defaultStackKey } from "../plugin";

const generateNumericData = (labelCount: number, datasetCount: number) => {
  const labels = Array.from({ length: labelCount }, (_, i) => `label_${i}`);
  const datasets = Array.from({ length: datasetCount }, (_, d) => ({
    data: Array.from({ length: labelCount }, (_, i) => (d + 1) * 10 + i),
    label: `dataset_${d}`,
  }));
  return { labels, datasets };
};

const generateObjectData = (
  labelCount: number,
  datasetCount: number,
  parsing: { xAxisKey: string; yAxisKey: string },
) => {
  const labels = Array.from({ length: labelCount }, (_, i) => `label_${i}`);
  const datasets = Array.from({ length: datasetCount }, (_, d) => ({
    data: Array.from({ length: labelCount }, (_, i) => ({
      [parsing.xAxisKey]: labels[i],
      [parsing.yAxisKey]: (d + 1) * 10 + i,
    })),
    label: `dataset_${d}`,
  }));
  return { labels, datasets } as unknown as ChartData;
};

const RUNS = 5;

const median = (values: number[]) => {
  const sorted = [...values].sort((a, b) => a - b);
  const mid = Math.floor(sorted.length / 2);
  return sorted.length % 2 ? sorted[mid] : (sorted[mid - 1] + sorted[mid]) / 2;
};

const timeMedian = (fn: () => void, runs: number) => {
  const times: number[] = [];
  for (let i = 0; i < runs; i++) {
    const start = performance.now();
    fn();
    times.push(performance.now() - start);
  }
  return median(times);
};

describe("summarizeValues performance", () => {
  const DATASET_COUNT = 5;

  describe.each([
    { sizeA: 500, sizeB: 1000 },
    { sizeA: 1000, sizeB: 2000 },
  ])("scaling from $sizeA to $sizeB labels", ({ sizeA, sizeB }) => {
    test("numeric data scales sub-quadratically", () => {
      const visiblesA = Array(DATASET_COUNT).fill(1);
      const dataA = generateNumericData(sizeA, DATASET_COUNT);
      const dataB = generateNumericData(sizeB, DATASET_COUNT);

      const timeA = timeMedian(() => summarizeValues(dataA, visiblesA, false, false), RUNS);
      const timeB = timeMedian(() => summarizeValues(dataB, visiblesA, false, false), RUNS);

      const ratio = timeB / timeA;
      expect(ratio).toBeLessThan(3);
    });

    test("object data scales sub-quadratically", () => {
      const parsing = { xAxisKey: "myX", yAxisKey: "myY" };
      const visiblesA = Array(DATASET_COUNT).fill(1);
      const dataA = generateObjectData(sizeA, DATASET_COUNT, parsing);
      const dataB = generateObjectData(sizeB, DATASET_COUNT, parsing);

      const timeA = timeMedian(
        () => summarizeValues(dataA, visiblesA, false, false, undefined, parsing),
        RUNS,
      );
      const timeB = timeMedian(
        () => summarizeValues(dataB, visiblesA, false, false, undefined, parsing),
        RUNS,
      );

      const ratio = timeB / timeA;
      expect(ratio).toBeLessThan(3);
    });
  });
});

describe("summarizeValues correctness at scale", () => {
  const DATASET_COUNT = 3;

  describe.each([{ size: 100 }, { size: 500 }])("with $size labels", ({ size }) => {
    test("numeric data totals are correct", () => {
      const data = generateNumericData(size, DATASET_COUNT);
      const visibles = Array(DATASET_COUNT).fill(1);

      const result = summarizeValues(data, visibles, false, false);

      expect(result).toHaveLength(size);
      for (let i = 0; i < size; i++) {
        const expected = Array.from(
          { length: DATASET_COUNT },
          (_, d) => (d + 1) * 10 + i,
        ).reduce((a, b) => a + b, 0);
        expect(result[i][defaultStackKey]).toBe(expected);
      }
    });

    test("object data totals are correct", () => {
      const parsing = { xAxisKey: "cat", yAxisKey: "val" };
      const data = generateObjectData(size, DATASET_COUNT, parsing);
      const visibles = Array(DATASET_COUNT).fill(1);

      const result = summarizeValues(data, visibles, false, false, undefined, parsing);

      expect(result).toHaveLength(size);
      for (let i = 0; i < size; i++) {
        const expected = Array.from(
          { length: DATASET_COUNT },
          (_, d) => (d + 1) * 10 + i,
        ).reduce((a, b) => a + b, 0);
        expect(result[i][defaultStackKey]).toBe(expected);
      }
    });
  });
});
