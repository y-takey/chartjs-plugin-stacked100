import { ParsingOptions } from "chart.js";
import { ExtendedChartData, PluginOptions } from "./types";
export declare const isObject: (obj: any) => obj is Record<string, any>;
export declare const dataValue: (dataPoint: any, isHorizontal: boolean, parsing: ParsingOptions["parsing"]) => any;
export declare const setOriginalData: (data: ExtendedChartData) => void;
export declare const roundOff: (value: number, precision: number) => number;
export declare const roundDown: (value: number, precision: number) => number;
export declare const roundUp: (value: number, precision: number) => number;
export declare const getPrecision: (pluginOptions: PluginOptions) => number;
