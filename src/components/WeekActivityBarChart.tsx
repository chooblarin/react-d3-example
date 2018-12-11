import React from "react";
import { scaleBand, scaleLinear } from "d3-scale";
import { select } from "d3-selection";
import { max } from "d3-array";
import { axisBottom } from "d3-axis";

import { InjectedProps } from "./withMeasureAndRender";

const getX = (item: any): number => item.date;
const getY = (item: any): number => item.ratio;
const formatDate = (date: number): string => {
  switch (date) {
    case 0:
      return "Sun";
    case 1:
      return "Mon";
    case 2:
      return "Tue";
    case 3:
      return "Wed";
    case 4:
      return "Thu";
    case 5:
      return "Fri";
    case 6:
      return "Sat";
    default:
      return "Unknown";
  }
};

type WeekActivityBarChartProps = {
  inputData: any[];
};

function WeekActivityBarChart({
  inputData,
  width,
  height
}: WeekActivityBarChartProps & InjectedProps) {
  const margin = { top: 20, right: 20, bottom: 40, left: 45 };
  const w = width - margin.left - margin.right;
  const h = height - margin.top - margin.bottom;

  // rotate date order to have a week to start with Monday
  const rotateDate = (date: number) => (date + (7 - 1)) % 7;
  const rotated = inputData.sort((a, b) => {
    return rotateDate(a.date) - rotateDate(b.date);
  });

  const x = scaleBand()
    .rangeRound([0, w])
    .domain(rotated.map(d => formatDate(getX(d))))
    .padding(0.1);

  const y = scaleLinear()
    .rangeRound([h, 0])
    .domain([0, max<number, any>(rotated, getY)]);

  const axisX = axisBottom(x);

  const maxY = max(inputData, d => getY(d));
  const maxYIndex = inputData.findIndex(d => getY(d) === maxY);

  return (
    <svg width={width} height={height}>
      <g transform={`translate(${margin.left}, ${margin.top})`}>
        {rotated.map((item, i) => (
          <rect
            key={`${i}`}
            className={`bar ${maxYIndex === i ? "marked" : ""}`}
            x={x(formatDate(getX(item)))}
            y={y(getY(item))}
            width={x.bandwidth()}
            height={h - y(getY(item))}
          />
        ))}
        <g
          className="axis axis-x"
          transform={`translate(0, ${h})`}
          ref={node => {
            const axis = select(node).call(axisX as any);
            axis.attr("font-size", 14);
            axis.select(".domain").remove();
            axis.selectAll(".tick line").remove();
          }}
        />
      </g>
      <style jsx>{`
        .bar {
          fill: #d8d8d8;
        }
        .bar.marked {
          fill: #51b2b8;
        }
        .axis {
          color: #676767;
        }
      `}</style>
    </svg>
  );
}

export default WeekActivityBarChart;
