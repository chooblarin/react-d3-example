import React from "react";
import { scaleLinear } from "d3-scale";
import { select } from "d3-selection";
import { extent } from "d3-array";
import { line } from "d3-shape";
import { axisBottom, axisLeft } from "d3-axis";

import { InjectedProps } from "../withMeasureAndRender";

type TimeSeriesChartProps = {
  inputData: any[];
  getX: (item: any) => Date;
  getY: (item: any) => number;
  formatX: (date: Date) => string;
};

function TimeSeriesChart({
  inputData,
  width,
  height,
  getX,
  getY,
  formatX
}: TimeSeriesChartProps & InjectedProps) {
  const margin = { top: 20, right: 20, bottom: 40, left: 45 };
  const w = width - margin.left - margin.right;
  const h = height - margin.top - margin.bottom;

  const x = scaleLinear()
    .range([0, w])
    .domain(extent(inputData, getX) as Date[]);

  const y = scaleLinear()
    .range([h, 0])
    .domain(extent(inputData, getY) as number[])
    .nice();

  const valueLine = line()
    .x((d: any) => x(getX(d)))
    .y((d: any) => y(getY(d)));

  const axisX = axisBottom(x)
    .ticks(inputData.length)
    .tickFormat(formatX as any);

  const axisY = axisLeft(y).ticks(5);

  return (
    <svg width={width} height={height}>
      <g transform={`translate(${margin.left}, ${margin.top})`}>
        <path className="line" d={valueLine(inputData) || ``} />
        <g
          className="axis axis--x"
          transform={`translate(0, ${h})`}
          ref={node => select(node).call(axisX as any)}
        />
        <g
          className="axis axis--y"
          ref={node => select(node).call(axisY as any)}
        />
      </g>
      <style jsx>
        {`
          .line {
            fill: none;
            stroke: teal;
            stroke-width: 2;
          }
        `}
      </style>
    </svg>
  );
}

export default TimeSeriesChart;
