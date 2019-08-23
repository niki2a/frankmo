import React, { useState, useEffect, useRef } from 'react';
import { csv } from 'd3-fetch';
import { timeParse } from 'd3-time-format';
import { format } from 'd3-format';
import LinePlot from './Plots';
import Spinner from './Spinner';

const STEP = 100;
const parseDate = timeParse('%Y-%m-%d');
const formatPrice = format('.4f');

function* makeRangeIterator(dataArray = [], step = 1) {
  for (let i = step; i <= dataArray.length - step; i += step) {
    yield dataArray.slice(i, i + step);
  }
}

export default () => {
  const [data, setData] = useState([]);
  const [activeData, setActiveData] = useState(data.slice(0, STEP));
  const getDataArray = useRef();

  useEffect(() => {
    (async () => {
      const result = await csv('/data/eurusd_hour.csv').then(rows =>
        rows.map(order => ({
          date: parseDate(order.Date),
          price: formatPrice(order.BidClose)
        }))
      );
      setData(result);
      // set generator with value from the hook activeData
      // use [] to run the effect only once
      getDataArray.current = makeRangeIterator(result, STEP);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!data.length) {
    return <Spinner />;
  }

  function handleClick() {
    const result = getDataArray.current.next();
    if (!result.done) {
      setActiveData(result.value);
    }
  }

  return (
    <>
      <div
        style={{ cursor: 'pointer' }}
        role="button"
        onClick={handleClick}
        onKeyPress={undefined}
        tabIndex={0}
      >
        CLick me
      </div>
      <LinePlot data={activeData} size={[1000, 500]} />
    </>
  );
};
