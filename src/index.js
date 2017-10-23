(function(Chart) {
  var Stacked100Plugin = {
    id: "stacked100",

    beforeInit: function(chartInstance, pluginOptions) {
      if (!pluginOptions.enable) return;

      var xAxes = chartInstance.options.scales.xAxes;
      var yAxes = chartInstance.options.scales.yAxes;
      var isVertical = chartInstance.config.type === "bar" || chartInstance.config.type === "line";

      [xAxes, yAxes].forEach(function(axes) {
        axes.forEach(function(hash) {
          hash.stacked = true;
        });
      });
      (isVertical ? yAxes : xAxes).forEach(function(hash) {
        hash.ticks.min = 0;
        hash.ticks.max = 100;
      });

      this._setOriginalData(chartInstance);

      chartInstance.options.tooltips.callbacks.label = function(tooltipItem, data) {
        var datasetIndex = tooltipItem.datasetIndex,
          index = tooltipItem.index,
          xLabel = tooltipItem.xLabel,
          yLabel = tooltipItem.yLabel;
        var datasetLabel = data.datasets[datasetIndex].label || "";

        return (
          "" +
          datasetLabel +
          ": " +
          (isVertical ? yLabel : xLabel) +
          "% (" +
          data.originalData[datasetIndex][index] +
          ")"
        );
      };
    },

    beforeUpdate: function(chartInstance, pluginOptions) {
      if (!pluginOptions.enable) return;

      var datasets = chartInstance.data.datasets;
      // restore
      if (chartInstance.data.originalData) {
        chartInstance.data.originalData.forEach(function(data, i) {
          datasets[i].data = data;
        });
      } else {
        this._setOriginalData(chartInstance);
      }

      // for excluding value of hidden item.
      var visibles = datasets.map(function(dataset) {
        if (!dataset._meta) return true;

        for (var i in dataset._meta) {
          return !dataset._meta[i].hidden;
        }
      });

      var totals = Array.apply(null, new Array(datasets[0].data.length)).map(function(el, i) {
        return datasets.reduce(function(sum, dataset, j) {
          var key = dataset.stack;
          if (!sum[key]) sum[key] = 0;
          sum[key] += dataset.data[i] * visibles[j];

          return sum;
        }, {});
      });
      datasets.forEach(function(dataset, i) {
        dataset.data = dataset.data.map(function(val, i) {
          return val ? Math.round(val * 1000 / totals[i][dataset.stack]) / 10 : 0;
        });
      });
    },
 
    _setOriginalData: function(chartInstance) {
      var allData = chartInstance.data.datasets.map(function(dataset) {
        return Array.from(dataset.data);
      });
      chartInstance.data.originalData = allData;
    }
  };

  Chart.pluginService.register(Stacked100Plugin);
}.call(this, Chart));
