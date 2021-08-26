import { Plugin, ChartType, ChartData } from "chart.js"

export type ExtendedChartData = ChartData & {
  calculatedData?: number[][];
  originalData?: ChartData["datasets"]
}

export type ExtendedPlugin = Plugin<ChartType, PluginOptions>

export interface PluginOptions {
  enable: boolean;
  replaceTooltipLabel?: boolean;
  precision?: number;
}
