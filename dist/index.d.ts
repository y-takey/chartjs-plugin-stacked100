export * from "./types";
declare const ChartPluginStacked100: {
    id: string;
    beforeInit: (chart: import("chart.js").Chart<keyof import("chart.js").ChartTypeRegistry, (number | [number, number] | import("chart.js").Point | import("chart.js").BubbleDataPoint)[], unknown>, args: import("chart.js/dist/types/basic").EmptyObject, options: import("./types").PluginOptions) => void;
    beforeUpdate: (chart: import("chart.js").Chart<keyof import("chart.js").ChartTypeRegistry, (number | [number, number] | import("chart.js").Point | import("chart.js").BubbleDataPoint)[], unknown>, args: {
        mode: import("chart.js").UpdateMode;
        cancelable: true;
    }, options: import("./types").PluginOptions) => boolean | void;
    afterUpdate: (chart: import("chart.js").Chart<keyof import("chart.js").ChartTypeRegistry, (number | [number, number] | import("chart.js").Point | import("chart.js").BubbleDataPoint)[], unknown>, args: {
        mode: import("chart.js").UpdateMode;
    }, options: import("./types").PluginOptions) => void;
};
export default ChartPluginStacked100;
