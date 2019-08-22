// import { useState } from 'react';
import { csv } from 'd3-fetch';
// import generator from './utils/generator';
// import LinePlot from './Plots';

export default () => {
  // const [data] = useState(() => );
  fetch('../data/eurusd_hour.csv').then(d => console.log('d', d));
  // const data = csv('../data/eurusd_hour.csv').then(d => console.log('d', d));
  // console.log('>>> data', data);
  // const [data] = useState(() => generator(100));

  return null;
  // return <LinePlot data={data} size={[1000, 500]} />;
};
