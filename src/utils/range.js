/* eslint-disable import/prefer-default-export */
export function* makeRangeIterator(dataArray = [], window = 1, step = 1) {
  for (let i = step; i <= dataArray.length - window; i += step) {
    yield dataArray.slice(i, i + window);
  }
}
