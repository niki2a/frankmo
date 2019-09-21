import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { axisRight, axisBottom } from 'd3-axis';
import { scaleLinear, scaleTime } from 'd3-scale';
import { extent } from 'd3-array';
import { line } from 'd3-shape';
import { select } from 'd3-selection';

const LinePlot = ({ size, data }) => {
  const [width, height] = size;
  const node = useRef(null);
  const [linePath, setLinePath] = useState(null);

  const xScale = scaleTime()
    .domain(extent(data, d => d.date))
    .range([0, width]);

  const yScale = scaleLinear()
    .domain(extent(data, d => +d.price))
    .range([height, 0]);

  const visualLine = line()
    .x(d => xScale(d.date))
    .y(d => yScale(d.price));

  useEffect(() => {
    const yAxis = axisRight(yScale);
    const xAxis = axisBottom(xScale);

    select('.yAxis').call(yAxis);
    select('.xAxis').call(xAxis);
    setLinePath(visualLine(data));
  }, [size, data, visualLine, yScale, xScale]);

  return (
    <svg ref={node} width={width} height={height}>
      <g>
        <path style={{ stroke: 'steelblue', strokeWidth: '2', fill: 'none' }} d={linePath} />
      </g>
      <g className="yAxis" />
      <g className="xAxis" />
    </svg>
  );
};

LinePlot.propTypes = {
  size: PropTypes.arrayOf(PropTypes.number).isRequired,
  data: PropTypes.arrayOf(
    PropTypes.shape({
      date: PropTypes.date,
      price: PropTypes.string
    })
  ).isRequired
};

export default LinePlot;
