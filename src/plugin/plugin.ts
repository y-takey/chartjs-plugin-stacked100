import { Chart, ChartType, TooltipCallbacks, TooltipItem } from "chart.js"

import { dataValue, setOriginalData, round } from "./utils"
import { ExtendedChartData, PluginOptions, ExtendedPlugin } from "./types"

// set calculated rate (xx%) to data.calculatedData
const calculateRate = function(data: ExtendedChartData, isHorizontal: boolean, precision: number) {
  const visibles = data.datasets.map((dataset) => dataset.hidden ? 0 : 1 );
  const datasetDataLength = data?.datasets?.[0]?.data?.length || 0;

  const totals = [...(new Array(datasetDataLength))].map((el, i) =>  {
    return data.datasets.reduce((sum, dataset, j) => {
      const key = dataset.stack;
      if (!sum[key]) sum[key] = 0;
      sum[key] += Math.abs(dataValue(dataset.data[i], isHorizontal)) * visibles[j];

      return sum;
    }, {});
  });

  data.calculatedData = data.datasets.map((dataset)  => {
    return dataset.data.map((val, j)  => {
      const total = totals[j][dataset.stack];
      const dv = dataValue(val, isHorizontal);
      return dv && total ? round(dv / total, precision) : 0;
    });
  });
};

const getPrecision = (pluginOptions: PluginOptions): number => {
  // return the (validated) configured precision from pluginOptions or default 1
  const defaultPrecision = 1;
  if (!("precision" in pluginOptions)) return defaultPrecision;
  if (!pluginOptions.precision) return defaultPrecision;
  const optionsPrecision = Math.floor(pluginOptions.precision);
  if (isNaN(optionsPrecision)) return defaultPrecision;
  if (optionsPrecision < 0 || optionsPrecision > 16) return defaultPrecision; 
  return optionsPrecision;
};

const tooltipLabel = (isHorizontal: boolean): TooltipCallbacks<ChartType>["label"] => {
  return (tooltipItem: TooltipItem<ChartType>)  => {
    const data = tooltipItem.chart.data as ExtendedChartData
    const datasetIndex = tooltipItem.datasetIndex;
    const index = tooltipItem.dataIndex;
    const datasetLabel = data.datasets[datasetIndex].label || "";
    const originalValue = data.originalData[datasetIndex][index];
    const rateValue = data.calculatedData[datasetIndex][index];

    return "" + datasetLabel + ": " + rateValue + "% (" + dataValue(originalValue, isHorizontal) + ")";
  }
};

const reflectData = (srcData: any[], datasets: ExtendedChartData["datasets"])  => {
  if (!srcData) return;

  srcData.forEach((data, i)  => {
    datasets[i].data = data;
  });
};

const isHorizontalChart = (chartInstance: Chart) => {
  return chartInstance.options.indexAxis === "y";
}


export const beforeInit: ExtendedPlugin["beforeInit"] = (chartInstance, args, pluginOptions) => {
  if (!pluginOptions.enable) return;

  const isHorizontal = isHorizontalChart(chartInstance);
  const targetAxis = isHorizontal ? "x" : "y"
  const hasNegative = chartInstance.data.datasets.some((dataset) => {
    return dataset.data.some((value) => value < 0);
  });
  ["x", "y"].forEach(axis => {
    const tickOption = axis === targetAxis ? { min: hasNegative ? -100 : 0, max: 100 } : {}
    const scaleOption = { stacked: true, ...tickOption, ...chartInstance.options.scales[axis] }
    chartInstance.options.scales[axis] = scaleOption
  })

  // Replace tooltips
  if ("replaceTooltipLabel" in pluginOptions && !pluginOptions.replaceTooltipLabel) return;

  chartInstance.options.plugins.tooltip.callbacks.label = tooltipLabel(isHorizontal);
}

export const beforeDatasetsUpdate: ExtendedPlugin["beforeDatasetsUpdate"] = (chartInstance, args, pluginOptions) =>{
  if (!pluginOptions.enable) return;

  const data = chartInstance.data as ExtendedChartData

  setOriginalData(data);
  const precision = getPrecision(pluginOptions);
  calculateRate(data, isHorizontalChart(chartInstance), precision);
  reflectData(data.calculatedData, data.datasets);
}

export const afterDatasetsUpdate: ExtendedPlugin["afterDatasetsUpdate"]  = (chartInstance, args, pluginOptions) => {
  if (!pluginOptions.enable) return;

  const data = chartInstance.data as ExtendedChartData

  reflectData(data.originalData, data.datasets);
}
