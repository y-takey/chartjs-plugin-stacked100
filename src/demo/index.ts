import Chart from 'chart.js/auto';

import ChartPluginStacked100 from '../plugin';
Chart.register(ChartPluginStacked100);

const getCanvas = (id: string): HTMLCanvasElement => document.getElementById(id) as HTMLCanvasElement
const plugins: any = {
  stacked100: { enable: true }
}

new Chart(getCanvas("my-chart-1"), {
  type: "bar",
  data: {
    labels: ["Foo", "Bar"],
    datasets: [
      { label: "bad", data: [5, 25], backgroundColor: "rgba(244, 143, 177, 0.6)" },
      { label: "better", data: [15, 10], backgroundColor: "rgba(255, 235, 59, 0.6)" },
      { label: "good", data: [10, 8], backgroundColor: "rgba(100, 181, 246, 0.6)" }
    ]
  },
  options: {
    indexAxis: "y",
    plugins
  }
});

new Chart(getCanvas("my-chart-2"), {
  type: "bar",
  data: {
    labels: ["Foo", "Bar"],
    datasets: [
      { label: "L1", stack: "Stack 0", data: [3, 2], backgroundColor: "rgba(244, 143, 177, 0.6)" },
      { label: "L2", stack: "Stack 0", data: [1, 1], backgroundColor: "rgba(255, 235, 59, 0.6)" },
      { label: "L1", stack: "Stack 1", data: [0, 3], backgroundColor: "rgba(100, 181, 246, 0.6)" },
      { label: "L2", stack: "Stack 1", data: [1, 4], backgroundColor: "rgba(51, 255, 74, 0.4)" }
    ]
  },
  options: {
    indexAxis: "y",
    plugins
  }
});

new Chart(getCanvas("my-chart-3"), {
  type: "bar",
  data: {
    labels: ["Hoge", "Fuga"],
    datasets: [
      { label: "L1", data: [10, 9], backgroundColor: "rgba(244, 143, 177, 0.6)" },
      { label: "L2", data: [20, 6], backgroundColor: "rgba(255, 235, 59, 0.6)" },
      { label: "L3", data: [30, 3], backgroundColor: "rgba(100, 181, 246, 0.6)" }
    ]
  },
  options: {
    plugins
  }
});

new Chart(getCanvas("my-chart-4"), {
  type: "line",
  data: {
    labels: ["2017-10-18", "2017-10-19", "2017-10-20"],
    datasets: [
      { label: "L1", fill: true, data: [1, 2, 0], backgroundColor: "rgba(244, 143, 177, 0.6)" },
      { label: "L2", fill: true, data: [1, 1, 3], backgroundColor: "rgba(255, 235, 59, 0.6)" },
      { label: "L3", fill: true, data: [1, 1, 2], backgroundColor: "rgba(100, 181, 246, 0.6)" },
      { label: "L4", fill: true, data: [1, 3, 1], backgroundColor: "rgba(51, 255, 74, 0.4)" }
    ]
  },
  options: {
    scales: {
      x: { stacked: true },
      y: { stacked: true }
    },
    plugins
  }
});

new Chart(getCanvas("my-chart-5"), {
  type: "line",
  data: {
    labels: ["2017-10-18", "2017-10-19", "2017-10-20"],
    datasets: [
      { label: "L1", fill: true, data: [{ x: "2017-10-18", y: 1 }, { x: "2017-10-19", y: 2 }, { x: "2017-10-20", y: 0 }], backgroundColor: "rgba(244, 143, 177, 0.6)" },
      { label: "L2", fill: true, data: [{ x: "2017-10-18", y: 1 }, { x: "2017-10-19", y: 1 }, { x: "2017-10-20", y: 3 }], backgroundColor: "rgba(255, 235, 59, 0.6)" },
      { label: "L3", fill: true, data: [{ x: "2017-10-18", y: 1 }, { x: "2017-10-19", y: 1 }, { x: "2017-10-20", y: 2 }], backgroundColor: "rgba(100, 181, 246, 0.6)" },
      { label: "L4", fill: true, data: [{ x: "2017-10-18", y: 1 }, { x: "2017-10-19", y: 3 }, { x: "2017-10-20", y: 1 }], backgroundColor: "rgba(51, 255, 74, 0.4)" }
    ]
  },
  options: {
    scales: {
      x: { stacked: true },
      y: { stacked: true }
    },
    plugins
  }
});

new Chart(getCanvas("my-chart-6"), {
  type: "bar",
  data: {
    labels: ["Foo", "Bar"],
    datasets: [
      { label: "bad", data: [{ x: 5, y: "Foo" }, { x: 25, y: "Bar" }], backgroundColor: "rgba(244, 143, 177, 0.6)" },
      { label: "better", data: [{ x: 15, y: "Foo" }, { x: 10, y: "Bar" }], backgroundColor: "rgba(255, 235, 59, 0.6)" },
      { label: "good", data: [{ x: 10, y: "Foo" }, { x: 8, y: "Bar" }], backgroundColor: "rgba(100, 181, 246, 0.6)" }
    ]
  },
  options: {
    indexAxis: "y",
    plugins
  }
});
