import { Plugin, ChartType, ChartData, ScatterDataPoint } from "chart.js";

type PluginDataPoint = number | ScatterDataPoint;

export type ExtendedChartData = ChartData & {
  calculatedData?: number[][];
  originalData?: PluginDataPoint[][];
};

export type ExtendedPlugin = Plugin<ChartType, PluginOptions>;

export interface PluginOptions {
  enable: boolean;
  replaceTooltipLabel?: boolean;
  fixNegativeScale?: boolean;
  individual?: boolean;
  precision?: number;
}

declare module "chart.js" {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  export interface PluginOptionsByType<TType extends ChartType> {
    stacked100: PluginOptions;
  }
}
