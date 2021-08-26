import { beforeInit, beforeDatasetsUpdate, afterDatasetsUpdate } from "./plugin"

const ChartPluginStacked100 = {
  id: "stacked100",
  beforeInit,
  beforeDatasetsUpdate,
  afterDatasetsUpdate
};

export default ChartPluginStacked100;
