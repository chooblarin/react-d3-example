import React from "react";
import { scaleBand, scaleLinear } from "d3-scale";
import { select } from "d3-selection";
import { max } from "d3-array";
import { axisBottom, axisLeft } from "d3-axis";

import { InjectedProps } from "./withMeasureAndRender";

type BarChartProps = {
  inputData: any[];
  getX: (item: any) => string;
  getY: (item: any) => number;
};

function BarChart({
  inputData,
  width,
  height,
  getX,
  getY
}: BarChartProps & InjectedProps) {
  const margin = { top: 20, right: 20, bottom: 30, left: 40 };

  // Make sure w and h would be larger than or equal to 0
  const w = Math.max(0, width - margin.left - margin.right);
  const h = Math.max(0, height - margin.top - margin.bottom);

  const x = scaleBand()
    .rangeRound([0, w])
    .padding(0.1);

  const y = scaleLinear().rangeRound([h, 0]);

  x.domain(inputData.map(getX));
  y.domain([0, max<number, any>(inputData, getY)]);

  const axisX = axisBottom(x);
  const axisY = axisLeft(y).ticks(4);
  return (
    <svg width={width} height={height}>
      <g transform={`translate(${margin.left}, ${margin.top})`}>
        {inputData.map((item, i) => (
          <rect
            key={`${i}`}
            className="bar"
            x={x(item.letter)}
            y={y(item.frequency)}
            width={x.bandwidth()}
            height={h - y(item.frequency)}
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
        rect {
          fill: #d8196c;
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

export default BarChart;
