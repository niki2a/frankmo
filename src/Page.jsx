import React, { useState } from 'react';
import generator from './utils/generator';
import LinePlot from './Plots';

export default () => {
  const [data] = useState(() => generator(100));
  return <LinePlot data={data} size={[1000, 500]} />;
};
