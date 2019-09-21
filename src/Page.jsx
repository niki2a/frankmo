import React, { useState, useEffect, useRef } from 'react';
import { csv } from 'd3-fetch';
import { timeParse } from 'd3-time-format';
import { format } from 'd3-format';
import { makeRangeIterator } from './utils/range';
import LinePlot from './Plots/LinePlot';
import Spinner from './Spinner';

const STEP = 5;
const DATA_WIDNOW_SIZE = 100;
const parseDate = timeParse('%Y-%m-%d');
const formatPrice = format('.4f');

export default () => {
  const [data, setData] = useState([]);
  const [activeData, setActiveData] = useState(data.slice(0, DATA_WIDNOW_SIZE));
  const getDataArray = useRef();

  useEffect(() => {
    (async () => {
      const result = await csv('public/data/eurusd_hour.csv').then(rows =>
        rows.map(order => ({
          date: parseDate(order.Date),
          price: formatPrice(order.BidClose)
        }))
      );
      setData(result);
      // set generator with value from the hook activeData
      // use [] to run the effect only once
      getDataArray.current = makeRangeIterator(result, DATA_WIDNOW_SIZE, STEP);
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
        style={{
          cursor: 'pointer',
          fontWeight: 'bold',
          width: '150px',
          height: '50px',
          outline: 'none',
          userSelect: 'none',
          lineHeight: '40px'
        }}
        role="button"
        onClick={handleClick}
        onKeyPress={undefined}
        tabIndex={0}
      >
        Show next week
      </div>
      <LinePlot data={activeData} size={[1000, 500]} />
    </>
  );
};
