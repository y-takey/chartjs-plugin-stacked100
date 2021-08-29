import { ExtendedChartData, PluginOptions } from "./types"

export const isObject = (obj: any) => {
  const type = typeof obj;
  return type === 'object' && !!obj;
}

export const dataValue = (dataPoint: any, isHorizontal: boolean) => {
  if (isObject(dataPoint)) {
    return isHorizontal ? dataPoint.x : dataPoint.y;
  }

  return dataPoint;
}

const cloneArray = <T>(srcAry: T[]): T[] => {
  return [...srcAry];
};

export const setOriginalData = (data: ExtendedChartData) => {
  data.originalData = data.datasets.map((dataset) => {
    return cloneArray(dataset.data);
  });
};

export const round = (value: number, precision: number): number => {
  const multiplicator = Math.pow(10, precision);
  return Math.round(value * 100 * multiplicator) / multiplicator;
};

export const getPrecision = (pluginOptions: PluginOptions): number => {
  // return the (validated) configured precision from pluginOptions or default 1
  const defaultPrecision = 1;
  if (!("precision" in pluginOptions)) return defaultPrecision;
  if (!pluginOptions.precision) return defaultPrecision;
  const optionsPrecision = Math.floor(pluginOptions.precision);
  if (isNaN(optionsPrecision)) return defaultPrecision;
  if (optionsPrecision < 0 || optionsPrecision > 16) return defaultPrecision; 
  return optionsPrecision;
};

