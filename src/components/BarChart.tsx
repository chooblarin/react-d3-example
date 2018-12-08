import React from "react";
import { scaleBand, scaleLinear } from "d3-scale";
import { select } from "d3-selection";
import { max } from "d3-array";
import { axisBottom, axisLeft } from "d3-axis";

const svgWidth = 960;
const svgHeight = 500;
const margin = { top: 20, right: 20, bottom: 30, left: 40 };

const width = svgWidth - margin.left - margin.right;
const height = svgHeight - margin.top - margin.bottom;

const x = scaleBand()
  .rangeRound([0, width])
  .padding(0.1);

const y = scaleLinear().rangeRound([height, 0]);

type BarChartProps = {
  inputData: any[];
  getX: (item: any) => string;
  getY: (item: any) => number;
};

function BarChart({ inputData, getX, getY }: BarChartProps) {
  x.domain(inputData.map(getX));
  y.domain([0, max<number, any>(inputData, getY)]);

  const axisX = axisBottom(x);
  const axisY = axisLeft(y).ticks(10);
  return (
    <svg width={svgWidth} height={svgHeight}>
      <g transform={`translate(${margin.left}, ${margin.top})`}>
        {inputData.map((item, i) => (
          <rect
            key={`${i}`}
            className="bar"
            x={x(item.letter)}
            y={y(item.frequency)}
            width={x.bandwidth()}
            height={height - y(item.frequency)}
          />
        ))}
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
      <style jsx>{`
        rect {
          fill: hotpink;
        }
      `}</style>
    </svg>
  );
}

export default BarChart;
