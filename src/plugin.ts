import {
  Chart,
  ChartType,
  TooltipCallbacks,
  TooltipItem,
  ChartData,
  ParsingOptions,
} from "chart.js";

import {
  dataValue,
  setOriginalData,
  roundOff,
  roundDown,
  roundUp,
  getPrecision,
  isObject,
} from "./utils";
import { ExtendedChartData, ExtendedPlugin, PluginOptions } from "./types";

interface CacheState {
  visibles: number[];
  individual: boolean;
  roundOption: "off" | "down" | "up";
  precision: number;
  axisId: string | undefined;
  parsing: unknown;
}

const cacheMap = new WeakMap<object, CacheState>();

export const defaultStackKey = Symbol();

const getDataIndex = (
  labels: unknown[],
  data: unknown,
  parsing: ParsingOptions["parsing"],
  isHorizontal: boolean,
  srcIndex: number,
) => {
  if (!isObject(data)) return srcIndex;

  const axis = isHorizontal ? "y" : "x";
  const parseKey = parsing && parsing[`${axis}AxisKey`];
  if (!parseKey) return srcIndex;
  const label = data[parseKey];
  if (!label) return srcIndex;
  const labelIndex = labels.findIndex((l) => l === label);

  return labelIndex < 0 ? srcIndex : labelIndex;
};

const buildLabelIndexMap = (labels: unknown[]): Map<unknown, number> => {
  const map = new Map<unknown, number>();
  for (let i = 0; i < labels.length; i++) {
    if (!map.has(labels[i])) {
      map.set(labels[i], i);
    }
  }
  return map;
};

const resolveDataIndex = (
  labelIndexMap: Map<unknown, number>,
  data: unknown,
  parsing: ParsingOptions["parsing"],
  isHorizontal: boolean,
  srcIndex: number,
) => {
  if (!isObject(data)) return srcIndex;

  const axis = isHorizontal ? "y" : "x";
  const parseKey = parsing && parsing[`${axis}AxisKey`];
  if (!parseKey) return srcIndex;
  const label = data[parseKey];
  if (!label) return srcIndex;
  const labelIndex = labelIndexMap.get(label);

  return labelIndex !== undefined ? labelIndex : srcIndex;
};

const mapDataToLabelIndices = (
  labelIndexMap: Map<unknown, number>,
  labels: unknown[],
  data: unknown[],
  parsing: ParsingOptions["parsing"],
  isHorizontal: boolean,
): unknown[] => {
  if (data.length === 0 || !isObject(data[0])) return data;

  const axis = isHorizontal ? "y" : "x";
  const parseKey = parsing && parsing[`${axis}AxisKey`];
  if (!parseKey) return data;

  const mapped: unknown[] = new Array(labels.length);
  for (let i = 0; i < data.length; i++) {
    const label = (data[i] as Record<string, any>)[parseKey];
    if (!label) {
      if (mapped[i] === undefined) mapped[i] = data[i];
      continue;
    }
    const labelIndex = labelIndexMap.get(label);
    const idx = labelIndex !== undefined ? labelIndex : i;
    if (mapped[idx] === undefined) {
      mapped[idx] = data[i];
    }
  }
  return mapped;
};

const isTargetDataset = (dataset: ChartData["datasets"][0], targetAxisId?: string) => {
  if (!targetAxisId) return true;

  // FIXME: avoid type error without any cast.
  const axisId = (dataset as any).xAxisID || (dataset as any).yAxisID;
  return axisId === targetAxisId;
};

export const summarizeValues = (
  chartData: ChartData,
  visibles: number[],
  isHorizontal: boolean,
  individual: boolean,
  targetAxisId?: string,
  parsing?: ParsingOptions["parsing"],
) => {
  return summarizeValuesInternal(
    chartData, visibles, isHorizontal, individual,
    targetAxisId, parsing, buildLabelIndexMap(chartData.labels),
  );
};

const summarizeValuesInternal = (
  chartData: ChartData,
  visibles: number[],
  isHorizontal: boolean,
  individual: boolean,
  targetAxisId: string | undefined,
  parsing: ParsingOptions["parsing"] | undefined,
  labelIndexMap: Map<unknown, number>,
) => {
  const { labels, datasets } = chartData;
  const datasetDataLength = labels.length;

  const isStack = datasets?.[0]?.stack;

  const targetInfos: Array<{
    parsingOptions: ParsingOptions["parsing"];
    key: string | symbol;
    mapped: unknown[];
    filteredIndex: number;
  }> = [];
  let filteredIndex = 0;
  for (const dataset of datasets) {
    if (!isTargetDataset(dataset, targetAxisId)) continue;
    const parsingOptions = dataset.parsing || parsing;
    targetInfos.push({
      parsingOptions,
      key: dataset.stack || defaultStackKey,
      mapped: mapDataToLabelIndices(
        labelIndexMap, labels, dataset.data, parsingOptions, isHorizontal,
      ),
      filteredIndex: filteredIndex++,
    });
  }

  const values = new Array(datasetDataLength);
  for (let i = 0; i < datasetDataLength; i++) {
    const sum: { [key: string | symbol]: number } = {};
    for (let t = 0; t < targetInfos.length; t++) {
      const info = targetInfos[t];
      const rec = info.mapped[i];
      if (!sum[info.key]) sum[info.key] = 0;
      const dv = dataValue(rec, isHorizontal, info.parsingOptions);
      const value = Math.abs(dv || 0) * visibles[info.filteredIndex];
      if (individual && !isStack) {
        if (sum[info.key] < value) sum[info.key] = value;
      } else {
        sum[info.key] += value;
      }
    }
    values[i] = sum;
  }

  if (!isStack || !individual) return values;
  return values.map((rec) => {
    const maxVal = Math.max(...(Object.values(rec) as number[]));
    Object.keys(rec).forEach((key) => (rec[key] = maxVal));
    return rec;
  });
};

const calculateRate = (
  data: ExtendedChartData,
  visibles: number[],
  isHorizontal: boolean,
  precision: number,
  individual: boolean,
  roundOption: "off" | "down" | "up" = "off",
  targetAxisId?: string,
  parsing?: ParsingOptions["parsing"],
) => {
  const labelIndexMap = buildLabelIndexMap(data.labels);
  const totals = summarizeValuesInternal(
    data, visibles, isHorizontal, individual, targetAxisId, parsing, labelIndexMap,
  );

  const round =
    roundOption === "off"
      ? roundOff
      : roundOption === "down"
        ? roundDown
        : roundUp;

  return data.datasets.map((dataset) => {
    const isTarget = isTargetDataset(dataset, targetAxisId);
    const parsingOptions = dataset.parsing || parsing;

    const ret = new Array(data.labels.length);
    dataset.data.forEach((val, j) => {
      const dv = dataValue(val, isHorizontal, parsingOptions);
      const dataIndex = resolveDataIndex(labelIndexMap, val, parsingOptions, isHorizontal, j);
      if (isTarget) {
        const key = dataset.stack || defaultStackKey;
        const total = totals[dataIndex][key];

        ret[dataIndex] = dv && total ? round(dv / total, precision) : 0;
      } else {
        ret[dataIndex] = dv;
      }
    });
    return ret;
  });
};

const tooltipLabel = (
  isHorizontal: boolean,
  targetAxisId?: string,
): TooltipCallbacks<ChartType>["label"] => {
  return (tooltipItem: TooltipItem<ChartType>) => {
    const data = tooltipItem.chart.data;
    const datasetIndex = tooltipItem.datasetIndex;
    const index = tooltipItem.dataIndex;
    const datasetLabel = data.datasets[datasetIndex].label || "";
    const parsing = data.datasets[datasetIndex].parsing || tooltipItem.chart.options.parsing;
    const originalValue = data.originalData[datasetIndex].find(
      (rec, i) => getDataIndex(data.labels, rec, parsing, isHorizontal, i) == index,
    );
    const rateValue = data.calculatedData[datasetIndex][index];
    const value = dataValue(originalValue, isHorizontal, parsing);

    if (!isTargetDataset(data.datasets[datasetIndex], targetAxisId)) {
      return `${datasetLabel}: ${rateValue}`;
    }
    return `${datasetLabel}: ${rateValue}% (${value})`;
  };
};

const reflectData = (srcData: any[], datasets: ExtendedChartData["datasets"]) => {
  if (!srcData) return;

  srcData.forEach((data, i) => {
    datasets[i].data = data;
  });
};

const isHorizontalChart = (chartInstance: Chart) => {
  return chartInstance.options.indexAxis === "y";
};

const getTickOption = (hasNegative: boolean, fixNegativeScale: boolean) => {
  const baseOption = { max: 100 };
  if (!hasNegative) return { min: 0, ...baseOption };
  if (fixNegativeScale) return { min: -100, ...baseOption };
  return baseOption;
};

const setScaleOption = (
  chartInstance: Chart,
  axisId: string,
  stacked: boolean,
  tickOption: Record<string, any>,
) => {
  const scaleOption = {
    stacked,
    ...tickOption,
    ...chartInstance.options.scales[axisId],
  };
  chartInstance.options.scales[axisId] = scaleOption;
};

export const beforeInit: ExtendedPlugin["beforeInit"] = (chartInstance, args, pluginOptions) => {
  if (!pluginOptions.enable) return;
  const { replaceTooltipLabel = true, fixNegativeScale = true, individual = false } = pluginOptions;

  const isHorizontal = isHorizontalChart(chartInstance);
  const targetAxis = isHorizontal ? "x" : "y";
  const hasNegative = chartInstance.data.datasets.some((dataset) => {
    return dataset.data.some(
      (value) =>
        (dataValue(value, isHorizontal, dataset.parsing || chartInstance.options.parsing) || 0) < 0,
    );
  });
  const tickOption = getTickOption(hasNegative, fixNegativeScale);
  if (pluginOptions.axisId) {
    setScaleOption(chartInstance, pluginOptions.axisId, !individual, tickOption);
  } else {
    ["x", "y"].forEach((axis) => {
      setScaleOption(chartInstance, axis, !individual, axis === targetAxis ? tickOption : {});
    });
  }

  // Replace tooltips
  if (!replaceTooltipLabel) return;

  chartInstance.options.plugins.tooltip.callbacks.label = tooltipLabel(
    isHorizontal,
    pluginOptions.axisId,
  );
};

const canUseCachedResult = (
  data: ExtendedChartData,
  visibles: number[],
  precision: number,
  pluginOptions: PluginOptions,
  parsing: unknown,
  cached: CacheState | undefined,
): boolean => {
  if (!data.originalData || !data.calculatedData || !cached) return false;
  if (data.originalData.length !== data.datasets.length) return false;
  if (cached.visibles.length !== visibles.length) return false;

  for (let i = 0; i < data.datasets.length; i++) {
    if (data.datasets[i].data !== data.originalData[i]) return false;
  }
  for (let i = 0; i < visibles.length; i++) {
    if (cached.visibles[i] !== visibles[i]) return false;
  }

  return (
    cached.individual === !!pluginOptions.individual &&
    cached.roundOption === (pluginOptions.roundOption || "off") &&
    cached.precision === precision &&
    cached.axisId === pluginOptions.axisId &&
    cached.parsing === parsing
  );
};

export const beforeUpdate: ExtendedPlugin["beforeUpdate"] = (
  chartInstance,
  _args,
  pluginOptions,
) => {
  if (!pluginOptions.enable) return;

  const data = chartInstance.data;
  const visibles = data.datasets.map((dataset, i) =>
    chartInstance.getDatasetMeta(i)?.hidden ?? dataset.hidden ? 0 : 1,
  );
  const precision = getPrecision(pluginOptions);
  const parsing = chartInstance.options.parsing;

  const cached = cacheMap.get(chartInstance);
  if (canUseCachedResult(data, visibles, precision, pluginOptions, parsing, cached)) {
    reflectData(data.calculatedData, data.datasets);
    return;
  }

  setOriginalData(data);
  data.calculatedData = calculateRate(
    data,
    visibles,
    isHorizontalChart(chartInstance),
    precision,
    pluginOptions.individual,
    pluginOptions.roundOption,
    pluginOptions.axisId,
    parsing,
  );
  reflectData(data.calculatedData, data.datasets);

  cacheMap.set(chartInstance, {
    visibles: [...visibles],
    individual: !!pluginOptions.individual,
    roundOption: pluginOptions.roundOption || "off",
    precision,
    axisId: pluginOptions.axisId,
    parsing,
  });
};

export const afterUpdate: ExtendedPlugin["afterUpdate"] = (chartInstance, _args, pluginOptions) => {
  if (!pluginOptions.enable) return;

  const data = chartInstance.data;

  reflectData(data.originalData, data.datasets);
};
