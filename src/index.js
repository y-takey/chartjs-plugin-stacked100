(function(Chart) {
  var Stacked100Plugin = {
    id: "stacked100",

    beforeInit: function(chartInstance, pluginOptions) {
      if (!pluginOptions.enable) return;

      var xAxes = chartInstance.options.scales.xAxes;
      var yAxes = chartInstance.options.scales.yAxes;
      var isVertical = chartInstance.config.type === "bar";

      [xAxes, yAxes].forEach(function(axes) {
        axes.forEach(function(hash) {
          hash.stacked = true;
        });
      });
      (isVertical ? yAxes : xAxes).forEach(function(hash) {
        hash.ticks.min = 0;
        hash.ticks.max = 100;
      });

      var allData = chartInstance.data.datasets.map(function(dataset) {
        return dataset.data;
      });
      chartInstance.data.originalData = allData;

      chartInstance.options.tooltips.callbacks.label = function(tooltipItem, data) {
        var datasetIndex = tooltipItem.datasetIndex,
          index = tooltipItem.index,
          xLabel = tooltipItem.xLabel;
        var datasetLabel = data.datasets[datasetIndex].label || "";

        return "" + datasetLabel + ": " + xLabel + "% (" + data.originalData[datasetIndex][index] + ")";
      };
    },

    beforeUpdate: function(chartInstance, pluginOptions) {
      if (!pluginOptions.enable) return;

      var datasets = chartInstance.data.datasets;
      var allData = chartInstance.data.originalData;

      // for excluding value of hidden item.
      var visibles = datasets.map(function(dataset) {
        if (!dataset._meta) return true;

        return !dataset._meta[0].hidden;
      });

      var totals = Array.apply(null, new Array(allData[0].length)).map(function(el, i) {
        return allData.reduce(function(sum, data, j) {
          return sum + data[i] * visibles[j];
        }, 0);
      });
      datasets.forEach(function(dataset, i) {
        dataset.data = allData[i].map(function(val, i) {
          return Math.round(val * 1000 / totals[i]) / 10;
        });
      });
    }
  };

  Chart.pluginService.register(Stacked100Plugin);
}.call(this, Chart));
