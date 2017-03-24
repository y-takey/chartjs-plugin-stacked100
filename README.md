# chartjs-plugin-stacked100
This plugin for Chart.js that makes your bar chart to 100% stacked bar chart.

## Installation

```
npm install chartjs-plugin-stacked100 --save
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

![Result image](https://github.com/y-takey/chartjs-plugin-stacked100/blob/master/100%25stacked-bar-chart.png)
