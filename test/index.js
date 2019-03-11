const chart = new Chart(document.getElementById("my-chart-1"), {
  type: "horizontalBar",
  data: {
    labels: ["Foo", "Bar"],
    datasets: [
      { label: "bad", data: [5, 25], backgroundColor: "rgba(244, 143, 177, 0.6)" },
      { label: "better", data: [15, 10], backgroundColor: "rgba(255, 235, 59, 0.6)" },
      { label: "good", data: [10, 8], backgroundColor: "rgba(100, 181, 246, 0.6)" }
    ]
  },
  options: {
    plugins: {
      stacked100: { enable: true }
    }
  }
});

// setTimeout(() => {
//   chart.data.labels.push("hoge");
//   chart.data.datasets.forEach((dataset, i) => {
//     dataset.data.push(10 + i * 3);
//   });
//   chart.update();
// }, 3000);

new Chart(document.getElementById("my-chart-2"), {
  type: "horizontalBar",
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
    plugins: {
      stacked100: { enable: true }
    }
  }
});

new Chart(document.getElementById("my-chart-3"), {
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
    plugins: {
      stacked100: { enable: true }
    }
  }
});

new Chart(document.getElementById("my-chart-4"), {
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
      xAxes: [{ stacked: true }],
      yAxes: [{ stacked: true }]
    },
    plugins: {
      stacked100: { enable: true }
    }
  }
});

new Chart(document.getElementById("my-chart-5"), {
  type: "line",
  data: {
    labels: ["2017-10-18", "2017-10-19", "2017-10-20"],
    datasets: [
      { label: "L1", fill: true, data: [{ y: 1 }, { y: 2 }, { y: 0 }], backgroundColor: "rgba(244, 143, 177, 0.6)" },
      { label: "L2", fill: true, data: [{ y: 1 }, { y: 1 }, { y: 3 }], backgroundColor: "rgba(255, 235, 59, 0.6)" },
      { label: "L3", fill: true, data: [{ y: 1 }, { y: 1 }, { y: 2 }], backgroundColor: "rgba(100, 181, 246, 0.6)" },
      { label: "L4", fill: true, data: [{ y: 1 }, { y: 3 }, { y: 1 }], backgroundColor: "rgba(51, 255, 74, 0.4)" }
    ]
  },
  options: {
    scales: {
      xAxes: [{ stacked: true }],
      yAxes: [{ stacked: true }]
    },
    plugins: {
      stacked100: { enable: true }
    }
  }
});

new Chart(document.getElementById("my-chart-6"), {
  type: "horizontalBar",
  data: {
    labels: ["Foo", "Bar"],
    datasets: [
      { label: "bad", data: [{ x: 5 }, { x: 25 }], backgroundColor: "rgba(244, 143, 177, 0.6)" },
      { label: "better", data: [{ x: 15 }, { x: 10 }], backgroundColor: "rgba(255, 235, 59, 0.6)" },
      { label: "good", data: [{ x: 10 }, { x: 8 }], backgroundColor: "rgba(100, 181, 246, 0.6)" }
    ]
  },
  options: {
    plugins: {
      stacked100: { enable: true }
    }
  }
});
