/* eslint-disable */
export default (length = 10) => {
  const range = [];
  for (let index = 0; index < length; index += 1) {
    if (index === 0) {
      range.push(Math.floor(Math.random() * 1000));
      continue;
    }
    range.push(
      range[index - 1] + Math.floor(Math.random() * 50) * (-1) ** Math.floor(Math.random() * 10)
    );
  }
  return range;
};
