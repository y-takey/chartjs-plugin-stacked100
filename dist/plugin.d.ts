import { ChartData, ParsingOptions } from "chart.js";
import { ExtendedPlugin } from "./types";
export declare const defaultStackKey: unique symbol;
export declare const summarizeValues: (chartData: ChartData, visibles: number[], isHorizontal: boolean, individual: boolean, targetAxisId?: string, parsing?: ParsingOptions["parsing"]) => {
    [key: string]: number;
    [key: symbol]: number;
}[];
export declare const beforeInit: ExtendedPlugin["beforeInit"];
export declare const beforeUpdate: ExtendedPlugin["beforeUpdate"];
export declare const afterUpdate: ExtendedPlugin["afterUpdate"];
