import React from "react";
import { scaleBand, scaleLinear } from "d3-scale";
import { select } from "d3-selection";
import { max } from "d3-array";
import { axisBottom, axisLeft } from "d3-axis";

import { InjectedProps } from "../withMeasureAndRender";

type RoundedBarChartProps = {
  inputData: any[];
  getX: (item: any) => string;
  getY: (item: any) => number;
  radius: number;
  color?: string;
};

function RoundedBarChart({
  inputData,
  width,
  height,
  getX,
  getY,
  color,
  radius
}: RoundedBarChartProps & InjectedProps) {
  const margin = { top: 20, right: 20, bottom: 30, left: 40 };

  // Make sure w and h would be larger than or equal to 0
  const w = Math.max(0, width - margin.left - margin.right);
  const h = Math.max(0, height - margin.top - margin.bottom);

  const x = scaleBand()
    .rangeRound([0, w])
    .padding(0.4);

  const y = scaleLinear().rangeRound([h, 0]);

  x.domain(inputData.map(getX));
  y.domain([0, max<number, any>(inputData, getY)]);

  const axisX = axisBottom(x);
  const axisY = axisLeft(y).ticks(4);

  return (
    <svg width={width} height={height}>
      <g transform={`translate(${margin.left}, ${margin.top})`}>
        {inputData.map((item, i) => {
          const bw = x.bandwidth();
          const bh = h - y(getY(item));
          return (
            <path
              d={`M${x(getX(item))},${h}
              v${-bh + radius}
              a${radius},${radius} 0 0 1 ${radius},${-radius}
              h${bw - 2 * radius}
              a${radius},${radius} 0 0 1 ${radius},${radius}
              v${bh - radius}Z`}
              key={`${i}`}
            />
          );
        })}
        <g
          className="axis axis-x"
          transform={`translate(0, ${h})`}
          ref={node => {
            const axis = select(node).call(axisX as any);
            axis.selectAll(".tick line").remove();
          }}
        />
        <g className="axis" ref={node => select(node).call(axisY as any)} />
      </g>
      <style jsx>{`
        path {
          fill: ${color || "#d8196c"};
        }
        .axis {
          color: #676767;
          font-size: 0.8rem;
        }
        .axis-x {
          font-size: calc(0.7rem + 0.2vw);
        }
      `}</style>
    </svg>
  );
}

export default RoundedBarChart;
