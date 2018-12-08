import React from "react";
import { scaleLinear } from "d3-scale";
import { select } from "d3-selection";
import { extent } from "d3-array";
import { line } from "d3-shape";
import { axisBottom, axisLeft } from "d3-axis";

const svgWidth = 650;
const svgHeight = 400;

const margin = { top: 20, right: 20, bottom: 40, left: 45 };
const width = svgWidth - margin.left - margin.right;
const height = svgHeight - margin.top - margin.bottom;

type TimeSeriesChartProps = {
  inputData: any[];
  getX: (item: any) => Date;
  getY: (item: any) => number;
  formatX: (date: Date) => string;
};

function TimeSeriesChart({
  inputData,
  getX,
  getY,
  formatX
}: TimeSeriesChartProps) {
  const x = scaleLinear()
    .range([0, width])
    .domain(extent(inputData, getX) as Date[]);

  const y = scaleLinear()
    .range([height, 0])
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
    <svg width={svgWidth} height={svgHeight}>
      <g transform={`translate(${margin.left}, ${margin.top})`}>
        <path className="line" d={valueLine(inputData) || ``} />
        <g
          className="axis axis--x"
          transform={`translate(0, ${height})`}
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
