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

![Result image](https://raw.githubusercontent.com/y-takey/chartjs-plugin-stacked100/master/100%25stacked-bar-chart.png)

## Supported chart types

* bar
* horizontalBar
* line (via [@HoJSim](https://github.com/HoJSim), thanks!)

## Contributing

Pull requests and issues are always welcome.

For bugs and feature requests, [please create an issue](https://github.com/y-takey/chartjs-plugin-stacked100/issues).

1. Fork it!
2. Create your feature branch: `git checkout -b my-new-feature`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin my-new-feature`
5. Submit a pull request!
