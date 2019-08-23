// import { useState } from 'react';
import * as d3 from 'd3';
// import generator from './utils/generator';
// import LinePlot from './Plots';

export default () => {
  d3.csv('/data/eurusd_hour.csv').then(d => console.log('d', d));
  // const [data] = useState(() => );
  // csv(csvData).then(d => console.log('d', d));
  // fetch('../public/data/eurusd_hour.csv').then(d => console.log('d', d));
  // const [data] = useState(() => generator(100));

  return null;
  // return <LinePlot data={data} size={[1000, 500]} />;
};
