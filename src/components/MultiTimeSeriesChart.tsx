import React from "react";
import { scaleTime, scaleLinear } from "d3-scale";
import { min, max } from "d3-array";
import { line, curveLinear } from "d3-shape";
import { select } from "d3-selection";
import { axisBottom, axisLeft } from "d3-axis";

import { InjectedProps } from "./withMeasureAndRender";

type MultiTimeSeriesChartProps = {
  mutiInputData: any[][];
};

function MultiTimeSeriesChart({
  mutiInputData,
  width,
  height
}: MultiTimeSeriesChartProps & InjectedProps) {
  const getX = (item: any) => item.time;
  const getY = (item: any) => item.value;

  const margin = { top: 20, right: 20, bottom: 40, left: 45 };
  const w = width - margin.left - margin.right;
  const h = height - margin.top - margin.bottom;

  const minX = min(mutiInputData, data => min(data, d => getX(d).toDate()));
  const maxX = max(mutiInputData, data => max(data, d => getX(d).toDate()));
  const minY = min(mutiInputData, data => min(data, getY));
  const maxY = max(mutiInputData, data => max(data, getY));

  const x = scaleTime()
    .range([0, w])
    .domain([minX, maxX]);

  const upperMargin = 3;
  const lowerMargin = 10;
  const y = scaleLinear()
    .range([h, 0])
    .domain([Math.max(0, minY - lowerMargin), maxY + upperMargin])
    .nice();

  const valueLine = line()
    .x((d: any) => x(getX(d)))
    .y((d: any) => y(getY(d)))
    .curve(curveLinear);

  // setup axis
  const numOfYAxis = 5;
  const axisX = axisBottom(x);
  const axisY = axisLeft(y).ticks(numOfYAxis);
  const horizontalLines = axisLeft(y)
    .ticks(numOfYAxis)
    .tickSize(-w)
    .tickFormat(() => "");

  return (
    <svg width={width} height={height}>
      <g transform={`translate(${margin.left}, ${margin.top})`}>
        <g
          className="grid h-grid"
          ref={node => {
            const grid = select(node);
            grid
              .call(horizontalLines as any)
              .select(".domain")
              .remove();
            grid.selectAll(".tick line").attr("stroke", "#e1e1e1");
          }}
        />
        <g
          className="axis axis-x"
          transform={`translate(0, ${h})`}
          ref={node => select(node).call(axisX as any)}
        />
        <g
          className="axis axis-y"
          ref={node => select(node).call(axisY as any)}
        />
        <g className="lines">
          {mutiInputData.map((data, i) => (
            <path
              className="line"
              d={valueLine(data as any) || ``}
              key={`${i}`}
            />
          ))}
        </g>
      </g>
      <style jsx>
        {`
          .lines {
            fill: none;
            stroke-width: 2;
          }
          .lines path:nth-child(1) {
            stroke: #1c9099;
          }
          .lines path:nth-child(2) {
            stroke: #901c99;
          }
          .lines path:nth-child(3) {
            stroke: #99901c;
          }
          .axis {
            color: #676767;
          }
        `}
      </style>
    </svg>
  );
}

export default MultiTimeSeriesChart;
