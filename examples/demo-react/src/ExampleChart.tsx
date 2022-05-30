import { Chart, registerables } from "chart.js";
import { Bar } from "react-chartjs-2";
import ChartjsPluginStacked100 from "chartjs-plugin-stacked100";

Chart.register(...registerables, ChartjsPluginStacked100);

const ExampleChart = () => (
  <div>
    <Bar
      data={{
        labels: ["Foo", "Bar"],
        datasets: [
          { label: "bad", data: [5, 25], backgroundColor: "rgba(244, 143, 177, 0.6)" },
          { label: "better", data: [15, 10], backgroundColor: "rgba(255, 235, 59, 0.6)" },
          { label: "good", data: [10, 8], backgroundColor: "rgba(100, 181, 246, 0.6)" },
        ],
      }}
      options={{
        indexAxis: "y",
        plugins: {
          stacked100: { enable: true },
        },
      }}
    />
  </div>
);

export default ExampleChart;
