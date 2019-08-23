import React, { useState, useEffect } from 'react';
import { csv } from 'd3-fetch';
import { timeParse } from 'd3-time-format';
import { format } from 'd3-format';
import LinePlot from './Plots';
import Spinner from './Spinner';

const parseDate = timeParse('%Y-%m-%d');
const formatPrice = format('.4f');

export default () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    (async () => {
      const result = await csv('/data/eurusd_hour.csv').then(rows =>
        rows.map(order => ({
          date: parseDate(order.Date),
          price: formatPrice(order.BidClose)
        }))
      );
      setData(result);
    })();
  }, []);

  if (!data.length) {
    return <Spinner />;
  }

  return <LinePlot data={data.slice(0, 100)} size={[1000, 500]} />;
};
