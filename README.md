# chartjs-plugin-stacked100
This plugin for Chart.js that makes your bar chart to 100% stacked bar chart.

Demo: https://y-takey.github.io/chartjs-plugin-stacked100

## Installation

```
npm install chartjs-plugin-stacked100 --save
```

## Usage

specify plugin options with `{ stacked100: { enable: true } }`.

#### a example

```javascript
new Chart(document.getElementById('my-chart'), {
  type: 'horizontalBar',
  data: {
    labels: ["Foo", "Bar"],
    datasets: [
      { label: "bad",    data: [5, 25],  backgroundColor: "rgba(244, 143, 177, 0.6)" },
      { label: "better", data: [15, 10], backgroundColor: "rgba(255, 235, 59, 0.6)" },
      { label: "good",   data: [10, 8],  backgroundColor: "rgba(100, 181, 246, 0.6)" }
    ]
  },
  options: {
    plugins: {
      stacked100: { enable: true }
    }
  }  
});
```

![Result image](https://github.com/y-takey/chartjs-plugin-stacked100/blob/master/100%25stacked-bar-chart.png)
