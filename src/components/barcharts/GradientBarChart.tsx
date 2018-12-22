import React from "react";
import { scaleBand, scaleLinear } from "d3-scale";
import { select } from "d3-selection";
import { max } from "d3-array";
import { axisBottom, axisLeft } from "d3-axis";

import { InjectedProps } from "../withMeasureAndRender";

type GradientBarChartProps = {
  inputData: any[];
  getX: (item: any) => string;
  getY: (item: any) => number;
};

function GradientBarChart({
  inputData,
  width,
  height,
  getX,
  getY
}: GradientBarChartProps & InjectedProps) {
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
      <defs>
        <linearGradient id="bg-gradient" x1="0" x2="0" y1="0" y2="1">
          <stop stopColor="#8856a7" offset="0%" />
          <stop stopColor="#9ebcda" offset="100%" />
        </linearGradient>
      </defs>
      <g transform={`translate(${margin.left}, ${margin.top})`}>
        {inputData.map((item, i) => (
          <rect
            key={`${i}`}
            x={x(getX(item))}
            y={y(getY(item))}
            width={x.bandwidth()}
            height={h - y(getY(item))}
            fill={`url(#bg-gradient)`}
          />
        ))}
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

export default GradientBarChart;
