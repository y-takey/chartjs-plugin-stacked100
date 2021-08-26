export const isObject = (obj: any) => {
  const type = typeof obj;
  return type === 'object' && !!obj;
}

export const dataValue = (dataPoint, isHorizontal: boolean) => {
  if (isObject(dataPoint)) {
    return isHorizontal ? dataPoint.x : dataPoint.y;
  }

  return dataPoint;
}

export const cloneArray = (srcAry: any[]) => {
  return [...srcAry];
};

export const setOriginalData = (data) => {
  data.originalData = data.datasets.map((dataset) => {
    return cloneArray(dataset.data);
  });
};

export const round = (value: number, precision: number): number => {
  const multiplicator = Math.pow(10, precision);
  return Math.round(value * 100 * multiplicator) / multiplicator;
};

