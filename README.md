# chartjs-plugin-stacked100
This plugin for Chart.js that makes your bar chart to 100% stacked bar chart.

## Plugin Setup

```javascript
const Stacked100Plugin = {
  beforeInit: (chartInstance) => {
    if (chartInstance.options.stacked !== '100%') return;

    const { xAxes, yAxes } = chartInstance.options.scales;
    [xAxes, yAxes].forEach((axes) => {
      axes.forEach((hash) => hash.stacked = true);
    })
    xAxes.forEach((hash) => { hash.ticks.min = 0; hash.ticks.max = 100 });

    chartInstance.options.tooltips.callbacks.label = (tooltipItem, data) => {
      const { datasetIndex, index, xLabel } = tooltipItem;
      const datasetLabel = data.datasets[datasetIndex].label || '';
      return `${datasetLabel}: ${xLabel}% (${data.originalData[datasetIndex][index]})`
    };
  },

  beforeUpdate: (chartInstance) => {
    if (chartInstance.options.stacked !== '100%') return;

    const datasets = chartInstance.data.datasets;
    const allData = datasets.map(dataset => dataset.data);
    chartInstance.data.originalData = allData;

    const totals = Array.apply(null, new Array(allData[0].length)).map((el, i) => {
      return allData.reduce((sum, data) => sum + data[i], 0);
    });
    datasets.forEach((dataset) => {
      dataset.data = dataset.data.map((val, i) => Math.round(val * 1000 / totals[i]) / 10);
    });
  }
};

Chart.pluginService.register(Stacked100Plugin);

```

## Usage

specify chart options with `{ stacked: '100%' }`.

#### a example

```javascript
new Chart(document.getElementById('stage'), {
  type: 'horizontalBar',
  data: {
    labels: ["Foo", "Bar"],
    datasets: [
      { label: "bad",    data: [5, 25],  backgroundColor: "rgba(244, 143, 177, 0.6)" },
      { label: "better", data: [15, 10], backgroundColor: "rgba(255, 235, 59, 0.6)" },
      { label: "good",   data: [10, 8],  backgroundColor: "rgba(100, 181, 246, 0.6)" }
    ]
  },
  options: { stacked: "100%" }
});
```
