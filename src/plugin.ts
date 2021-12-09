import { Chart, ChartType, TooltipCallbacks, TooltipItem } from "chart.js";

import { dataValue, setOriginalData, round, getPrecision } from "./utils";
import { ExtendedChartData, ExtendedPlugin } from "./types";

const calculateRate = (
  data: ExtendedChartData,
  visibles: number[],
  isHorizontal: boolean,
  precision: number,
) => {
  const datasetDataLength = data?.datasets?.reduce((longestLength, dataset) => {
    const length = dataset?.data?.length || 0;
    return length > longestLength ? length : longestLength;
  }, 0) || 0;

  const totals = [...new Array(datasetDataLength)].map((el, i) => {
    return data.datasets.reduce((sum, dataset, j) => {
      const key = dataset.stack || "main";
      if (!sum[key]) sum[key] = 0;
      sum[key] += Math.abs(dataValue(dataset.data[i] || 0, isHorizontal)) * visibles[j];

      return sum;
    }, {});
  });

  return data.datasets.map((dataset) => {
    return dataset.data.map((val, j) => {
      const total = totals[j][dataset.stack];
      const dv = dataValue(val, isHorizontal);
      return dv && total ? round(dv / total, precision) : 0;
    });
  });
};

const tooltipLabel = (isHorizontal: boolean): TooltipCallbacks<ChartType>["label"] => {
  return (tooltipItem: TooltipItem<ChartType>) => {
    const data = tooltipItem.chart.data as ExtendedChartData;
    const datasetIndex = tooltipItem.datasetIndex;
    const index = tooltipItem.dataIndex;
    const datasetLabel = data.datasets[datasetIndex].label || "";
    const originalValue = data.originalData[datasetIndex][index];
    const rateValue = data.calculatedData[datasetIndex][index];
    const value = dataValue(originalValue, isHorizontal);

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

export const beforeInit: ExtendedPlugin["beforeInit"] = (chartInstance, args, pluginOptions) => {
  if (!pluginOptions.enable) return;
  const { replaceTooltipLabel = true, fixNegativeScale = true } = pluginOptions;

  const isHorizontal = isHorizontalChart(chartInstance);
  const targetAxis = isHorizontal ? "x" : "y";
  const hasNegative = chartInstance.data.datasets.some((dataset) => {
    return dataset.data.some((value) => value < 0);
  });
  ["x", "y"].forEach((axis) => {
    const tickOption = axis === targetAxis ? getTickOption(hasNegative, fixNegativeScale) : {};
    const scaleOption = {
      stacked: true,
      ...tickOption,
      ...chartInstance.options.scales[axis],
    };
    chartInstance.options.scales[axis] = scaleOption;
  });

  // Replace tooltips
  if (!replaceTooltipLabel) return;

  chartInstance.options.plugins.tooltip.callbacks.label = tooltipLabel(isHorizontal);
};

export const beforeUpdate: ExtendedPlugin["beforeUpdate"] = (
  chartInstance,
  _args,
  pluginOptions,
) => {
  if (!pluginOptions.enable) return;

  const data = chartInstance.data as ExtendedChartData;

  setOriginalData(data);
  const visibles = data.datasets.map((_dataset, i) =>
    chartInstance.getDatasetMeta(i)?.hidden ? 0 : 1,
  );
  const precision = getPrecision(pluginOptions);
  data.calculatedData = calculateRate(data, visibles, isHorizontalChart(chartInstance), precision);
  reflectData(data.calculatedData, data.datasets);
};

export const afterUpdate: ExtendedPlugin["afterUpdate"] = (chartInstance, _args, pluginOptions) => {
  if (!pluginOptions.enable) return;

  const data = chartInstance.data as ExtendedChartData;

  reflectData(data.originalData, data.datasets);
};
