import { Plugin, ChartType, ChartData, ScatterDataPoint } from "chart.js"

type PluginDataPoint = number | ScatterDataPoint

export type ExtendedChartData = ChartData & {
  calculatedData?: number[][];
  originalData?: PluginDataPoint[][];
}

export type ExtendedPlugin = Plugin<ChartType, PluginOptions>

export interface PluginOptions {
  enable: boolean;
  replaceTooltipLabel?: boolean;
  precision?: number;
}
