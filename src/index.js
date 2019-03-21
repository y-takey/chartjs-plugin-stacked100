(function(Chart) {
  var isObject = function(obj) {
    var type = typeof obj;
    return type === 'object' && !!obj;
  }

  var dataValue = function(dataPoint, isHorizontal) {
    if (isObject(dataPoint)) {
      return isHorizontal ? dataPoint.x : dataPoint.y;
    }

    return dataPoint;
  }

  var cloneArray = function(srcAry) {
    var dstAry = [];
    var length = srcAry.length;

    for (var i = 0; i < length; i++) {
      dstAry.push(srcAry[i]);
    }
    return dstAry;
  };

  var setOriginalData = function(data) {
    data.originalData = data.datasets.map(function(dataset) {
      return cloneArray(dataset.data);
    });
  };

  // set calculated rate (xx%) to data.calculatedData
  var calculateRate = function(data, isHorizontal) {
    var visibles = data.datasets.map(function(dataset) {
      if (!dataset._meta) return true;

      for (var i in dataset._meta) {
        return !dataset._meta[i].hidden;
      }
    });
    
    var datasetDataLength = 0;
    if (data && data.datasets && data.datasets[0] && data.datasets[0].data) {
      datasetDataLength = data.datasets[0].data.length;
    }
    var totals = Array.apply(null, new Array(datasetDataLength)).map(function(el, i) {
      return data.datasets.reduce(function(sum, dataset, j) {
        var key = dataset.stack;
        if (!sum[key]) sum[key] = 0;
        sum[key] += dataValue(dataset.data[i], isHorizontal) * visibles[j];

        return sum;
      }, {});
    });

    data.calculatedData = data.datasets.map(function(dataset, i) {
      return dataset.data.map(function(val, i) {
        var total = totals[i][dataset.stack];
        var dv = dataValue(val, isHorizontal);
        return dv && total ? Math.round(dv * 1000 / total) / 10 : 0;
      });
    });
  };

    var precision = 2;
    var round = function(value) {
		var multiplicator = Math.pow(10, precision);
		return Math.round(value * 100 * multiplicator) / multiplicator;
	};
    
  var tooltipLabel = function(isHorizontal) {
    return function(tooltipItem, data) {
      var datasetIndex = tooltipItem.datasetIndex;
      var index = tooltipItem.index;
      var datasetLabel = data.datasets[datasetIndex].label || "";
      var originalValue = data.originalData[datasetIndex][index];
      var rateValue = data.calculatedData[datasetIndex][index];

      return "" + datasetLabel + ": " + rateValue + "% (" + dataValue(originalValue, isHorizontal) + ")";
    }
  };

  var reflectData = function(srcData, datasets) {
    if (!srcData) return;

    srcData.forEach(function(data, i) {
      datasets[i].data = data;
    });
  };

  var isHorizontalChart = function(chartInstance) {
    return chartInstance.config.type === "horizontalBar";
  }

  var Stacked100Plugin = {
    id: "stacked100",

    beforeInit: function(chartInstance, pluginOptions) {
      if (!pluginOptions.enable) return;

      var xAxes = chartInstance.options.scales.xAxes;
      var yAxes = chartInstance.options.scales.yAxes;
      var isVertical = chartInstance.config.type === "bar" || chartInstance.config.type === "line";
      
      if (pluginOptions.hasOwnProperty("precision")) {
        if (!pluginOptions.precision) return;
        var precisionOption = Math.floor(pluginOptions.precision);
        if (isNaN(precisionOption)) return;
        if (precisionOption < 0 || precisionOption > 16) return; 
        precision = precisionOption;
      };

      [xAxes, yAxes].forEach(function(axes) {
        axes.forEach(function(hash) {
          hash.stacked = true;
        });
      });
      (isVertical ? yAxes : xAxes).forEach(function(hash) {
        if (!hash.ticks.min) hash.ticks.min = 0;
        if (!hash.ticks.max) hash.ticks.max = 100;
      });

      // Replace tooltips
      if (pluginOptions.hasOwnProperty("replaceTooltipLabel") && !pluginOptions.replaceTooltipLabel) return;
      chartInstance.options.tooltips.callbacks.label = tooltipLabel(isHorizontalChart(chartInstance));
    },

    beforeDatasetsUpdate: function(chartInstance, pluginOptions) {
      if (!pluginOptions.enable) return;

      setOriginalData(chartInstance.data);
      calculateRate(chartInstance.data, isHorizontalChart(chartInstance));
      reflectData(chartInstance.data.calculatedData, chartInstance.data.datasets);
    },

    afterDatasetsUpdate: function(chartInstance, pluginOptions) {
      if (!pluginOptions.enable) return;

      reflectData(chartInstance.data.originalData, chartInstance.data.datasets);
    }
  };

  Chart.pluginService.register(Stacked100Plugin);
}.call(this, Chart));
