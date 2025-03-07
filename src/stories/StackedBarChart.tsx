import React from "react";
import { Chart, registerables, ChartConfiguration } from "chart.js";
import ChartjsPluginStacked100 from "../index";

Chart.register(...registerables, ChartjsPluginStacked100);

export const StackedBarChart: React.FC<ChartConfiguration> = props => {
  const canvasRef = React.useRef<HTMLCanvasElement>(null);

  React.useEffect(() => {
    // deep copy
    const clonedProps = JSON.parse(JSON.stringify(props));
    new Chart(canvasRef.current, clonedProps);
  }, [props]);

  return <canvas ref={canvasRef} width={600} height={400} />;
};
