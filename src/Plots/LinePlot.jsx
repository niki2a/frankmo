import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

import { scaleLinear } from 'd3-scale';
import { max, min } from 'd3-array';
import { line } from 'd3-shape';
import { select } from 'd3-selection';

function createBarChart(node, size, data) {
  if (!node || !node.current || !data) {
    return undefined;
  }

  const [width, height] = size;
  const dataMax = max(data);
  const dataMin = min(data);
  const xScale = scaleLinear()
    .domain([0, data.length])
    .range([0, width]);
  const yScale = scaleLinear()
    .domain([dataMin, dataMax])
    .range([height, 0]);

  const svg = select(node.current)
    .attr('width', width)
    .attr('height', height)
    .append('g')
    .attr('style', 'fill: blue;');

  const visualLine = line()
    .x((d, i) => xScale(i))
    .y(d => yScale(d));

  svg
    .append('path')
    .attr('style', 'stroke: steelblue;stroke-width: 2;fill: none;')
    .attr('d', visualLine(data));

  return undefined;
}

const LinePlot = ({ size, data }) => {
  const [width, height] = size;
  const node = useRef(null);
  useEffect(() => createBarChart(node, size, data), [node, size, data]);

  return <svg ref={node} width={width} height={height} />;
};

LinePlot.propTypes = {
  size: PropTypes.arrayOf(PropTypes.number).isRequired,
  data: PropTypes.arrayOf(PropTypes.number).isRequired
};

export default LinePlot;
