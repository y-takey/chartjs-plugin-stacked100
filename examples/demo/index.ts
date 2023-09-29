import { Chart, ChartConfiguration, registerables } from "chart.js";
import ChartPluginStacked100 from "../../src/index";

Chart.register(...registerables, ChartPluginStacked100);

const COLORS = {
  red: "rgba(244, 143, 177, 0.6)",
  yellow: "rgba(255, 235, 59, 0.6)",
  blue: "rgba(100, 181, 246, 0.6)",
  green: "rgba(51, 255, 74, 0.4)",
};

// config: ChartConfiguration<"bar" | "line", DefaultDataPoint<"bar" | "line">, unknown>
const createChart = (title: string, config: ChartConfiguration): void => {
  const container = document.createElement("div");
  container.className = "my-chart-container";
  const header = document.createElement("h3");
  header.innerText = title;
  container.appendChild(header);

  const canvas = document.createElement("canvas");
  container.appendChild(canvas);

  document.body.appendChild(container);

  new Chart(canvas, config);
};

createChart("Case.1 basic pattern", {
  type: "bar",
  data: {
    labels: ["Foo", "Bar"],
    datasets: [
      { label: "bad", data: [5, 25], backgroundColor: COLORS.red },
      { label: "better", data: [15, 10], backgroundColor: COLORS.yellow },
      { label: "good", data: [10, 8], backgroundColor: COLORS.blue },
    ],
  },
  options: {
    indexAxis: "y",
    plugins: { stacked100: { enable: true } },
  },
});

createChart("Case.2 stack group pattern", {
  type: "bar",
  data: {
    labels: ["Foo", "Bar"],
    datasets: [
      { label: "L1", stack: "Stack 0", data: [3, 2], backgroundColor: COLORS.red },
      { label: "L2", stack: "Stack 0", data: [1, 1], backgroundColor: COLORS.yellow },
      { label: "L1", stack: "Stack 1", data: [0, 3], backgroundColor: COLORS.blue },
      { label: "L2", stack: "Stack 1", data: [1, 4], backgroundColor: COLORS.green },
    ],
  },
  options: {
    indexAxis: "y",
    plugins: { stacked100: { enable: true } },
  },
});

createChart("Case.3 stacked vertical bar", {
  type: "bar",
  data: {
    labels: ["Hoge", "Fuga"],
    datasets: [
      { label: "L1", data: [10, 9], backgroundColor: COLORS.red },
      { label: "L2", data: [20, 6], backgroundColor: COLORS.yellow },
      { label: "L3", data: [30, 3], backgroundColor: COLORS.blue },
    ],
  },
  options: {
    plugins: { stacked100: { enable: true } },
  },
});

createChart("Case.4 stacked area", {
  type: "line",
  data: {
    labels: ["2017-10-18", "2017-10-19", "2017-10-20"],
    datasets: [
      { label: "L1", fill: true, data: [1, 2, 0], backgroundColor: COLORS.red },
      { label: "L2", fill: true, data: [1, 1, 3], backgroundColor: COLORS.yellow },
      { label: "L3", fill: true, data: [1, 1, 2], backgroundColor: COLORS.blue },
      { label: "L4", fill: true, data: [1, 3, 1], backgroundColor: COLORS.green },
    ],
  },
  options: {
    scales: {
      x: { stacked: true },
      y: { stacked: true },
    },
    plugins: { stacked100: { enable: true } },
  },
});

createChart("Case.5 stacked area with objects as data points", {
  type: "line",
  data: {
    labels: ["2017-10-18", "2017-10-19", "2017-10-20"],
    datasets: [
      {
        label: "L1",
        fill: true,
        data: [
          { x: "2017-10-18", y: 1 },
          { x: "2017-10-19", y: 2 },
          { x: "2017-10-20", y: 0 },
        ],
        backgroundColor: COLORS.red,
      },
      {
        label: "L2",
        fill: true,
        data: [
          { x: "2017-10-18", y: 1 },
          { x: "2017-10-19", y: 1 },
          { x: "2017-10-20", y: 3 },
        ],
        backgroundColor: COLORS.yellow,
      },
      {
        label: "L3",
        fill: true,
        data: [
          { x: "2017-10-18", y: 1 },
          { x: "2017-10-19", y: 1 },
          { x: "2017-10-20", y: 2 },
        ],
        backgroundColor: COLORS.blue,
      },
      {
        label: "L4",
        fill: true,
        data: [
          { x: "2017-10-18", y: 1 },
          { x: "2017-10-19", y: 3 },
          { x: "2017-10-20", y: 1 },
        ],
        backgroundColor: COLORS.green,
      },
    ] as any,
  },
  options: {
    scales: {
      x: { stacked: true },
      y: { stacked: true },
    },
    plugins: { stacked100: { enable: true } },
  },
});

createChart("Case.6 horizontal bar chart with objects as data points", {
  type: "bar",
  data: {
    labels: ["Foo", "Bar"],
    datasets: [
      {
        label: "bad",
        data: [
          { x: 5, y: "Foo" },
          { x: 25, y: "Bar" },
        ],
        backgroundColor: COLORS.red,
      },
      {
        label: "better",
        data: [
          { x: 15, y: "Foo" },
          { x: 10, y: "Bar" },
        ],
        backgroundColor: COLORS.yellow,
      },
      {
        label: "good",
        data: [
          { x: 10, y: "Foo" },
          { x: 8, y: "Bar" },
        ],
        backgroundColor: COLORS.blue,
      },
    ] as any,
  },
  options: {
    indexAxis: "y",
    plugins: { stacked100: { enable: true } },
  },
});

createChart("Case.7 Negative values", {
  type: "bar",
  data: {
    labels: ["Foo", "Bar"],
    datasets: [
      { label: "bad", data: [-5, 25], backgroundColor: COLORS.red },
      { label: "better", data: [15, -10], backgroundColor: COLORS.yellow },
      { label: "good", data: [10, 8], backgroundColor: COLORS.blue },
    ],
  },
  options: {
    indexAxis: "y",
    plugins: {
      stacked100: { enable: true, fixNegativeScale: true },
    },
  },
});

createChart("Case.8 Different data length", {
  type: "bar",
  data: {
    labels: ["Foo", "Bar", "Baz", "Quuz"],
    datasets: [
      { label: "bad", data: [-5, 25], backgroundColor: COLORS.red },
      { label: "better", data: [15, -10, 6, 4], backgroundColor: COLORS.yellow },
      { label: "good", data: [10, 8, 11], backgroundColor: COLORS.blue },
    ],
  },
  options: {
    indexAxis: "y",
    plugins: {
      stacked100: { enable: true, fixNegativeScale: true },
    },
  },
});

createChart("Case.9 Objects as data points with undefined value", {
  type: "bar",
  data: {
    labels: ["Foo", "Bar", "Baz", "Quuz"],
    datasets: [
      {
        label: "bad",
        data: [
          { x: 0, y: -5 },
          { x: 1, y: 25 },
          { x: 2, y: undefined },
          { x: 3, y: undefined },
        ],
        backgroundColor: COLORS.red,
      },
      {
        label: "better",
        data: [
          { x: 0, y: 15 },
          { x: 1, y: -10 },
          { x: 2, y: 6 },
          { x: 3, y: 4 },
        ],
        backgroundColor: COLORS.yellow,
      },
      {
        label: "good",
        data: [
          { x: 0, y: 10 },
          { x: 1, y: 8 },
          { x: 2, y: 11 },
          { x: 3, y: undefined },
        ],
        backgroundColor: COLORS.blue,
      },
    ],
  },
  options: {
    indexAxis: "x",
    plugins: { stacked100: { enable: true } },
  },
});

createChart("Case.10 Relative percentage to maxium value", {
  type: "bar",
  data: {
    labels: ["Foo", "Bar"],
    datasets: [
      { label: "bad", data: [5, 25], backgroundColor: COLORS.red },
      { label: "better", data: [15, 10], backgroundColor: COLORS.yellow },
      { label: "good", data: [10, 8], backgroundColor: COLORS.blue },
    ],
  },
  options: {
    indexAxis: "y",
    plugins: {
      stacked100: { enable: true, individual: true },
    },
  },
});

createChart("Case.11 Relative percentage with stack", {
  type: "bar",
  data: {
    labels: ["Foo", "Bar"],
    datasets: [
      { label: "L1", stack: "Stack 0", data: [3, 2], backgroundColor: COLORS.red },
      { label: "L2", stack: "Stack 0", data: [1, 1], backgroundColor: COLORS.yellow },
      { label: "L1", stack: "Stack 1", data: [0, 3], backgroundColor: COLORS.blue },
      { label: "L2", stack: "Stack 1", data: [1, 4], backgroundColor: COLORS.green },
    ],
  },
  options: {
    indexAxis: "y",
    plugins: { stacked100: { enable: true, individual: true } },
    scales: {
      x: { stacked: true },
      y: { stacked: true },
    },
  },
});

createChart("Case.12 Multiple axis(combo horizontal bar/line)", {
  type: "bar",
  data: {
    labels: ["Foo", "Bar"],
    datasets: [
      {
        label: "bad",
        data: [5, 25],
        backgroundColor: COLORS.red,
        stack: "stack1",
        xAxisID: "axis1",
      },
      {
        label: "better",
        data: [15, 10],
        backgroundColor: COLORS.yellow,
        stack: "stack1",
        xAxisID: "axis1",
      },
      {
        type: "line",
        label: "good",
        data: [43, 24],
        backgroundColor: COLORS.blue,
        xAxisID: "axis2",
      },
    ],
  },
  options: {
    indexAxis: "y",
    plugins: { stacked100: { enable: true, axisId: "axis1" } },
    scales: {
      axis1: {
        position: "top",
      },
      axis2: {
        position: "bottom",
      },
    },
  },
});

createChart("Case.13 Multiple axis(combo vertical bar/line)", {
  type: "bar",
  data: {
    labels: ["Foo", "Bar"],
    datasets: [
      {
        label: "bad",
        data: [5, 25],
        backgroundColor: COLORS.red,
        stack: "stack1",
        yAxisID: "axis1",
      },
      {
        label: "better",
        data: [15, 10],
        backgroundColor: COLORS.yellow,
        stack: "stack1",
        yAxisID: "axis1",
      },
      {
        type: "line",
        label: "good",
        data: [43, 24],
        backgroundColor: COLORS.blue,
        yAxisID: "axis2",
      },
    ],
  },
  options: {
    plugins: { stacked100: { enable: true, axisId: "axis1" } },
    scales: {
      axis1: {
        position: "left",
      },
      axis2: {
        position: "right",
      },
    },
  },
});

createChart("Case.14 horizontal bar chart with parsing option", {
  type: "bar",
  data: {
    labels: ["Foo", "Bar"],
    datasets: [
      {
        label: "bad",
        data: [
          { foo: 5, bar: "Foo" },
          { foo: 25, bar: "Bar" },
        ],
        backgroundColor: COLORS.red,
      },
      {
        label: "better",
        data: [
          { foo: 15, bar: "Foo" },
          { foo: 10, bar: "Bar" },
        ],
        backgroundColor: COLORS.yellow,
      },
      {
        label: "good",
        data: [
          { foo2: 10, bar2: "Foo" },
          { foo2: 8, bar2: "Bar" },
        ],
        parsing: { xAxisKey: "foo2", yAxisKey: "bar2" },
        backgroundColor: COLORS.blue,
      },
    ] as any,
  },
  options: {
    indexAxis: "y",
    parsing: { xAxisKey: "foo", yAxisKey: "bar" },
    plugins: { stacked100: { enable: true } },
  },
});
