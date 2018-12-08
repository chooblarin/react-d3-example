import React from "react";
import { scaleOrdinal } from "d3-scale";
import { arc as d3Arc, pie as d3Pie } from "d3-shape";

const fillColor = scaleOrdinal().range(["purple", "steelblue"]);

const width = 960;
const height = 500;
const radius = Math.min(width, height) / 2;

const pie = d3Pie()
  .sort(null)
  .value((d: any) => d.ratio);

const arc = d3Arc()
  .outerRadius(radius)
  .innerRadius(radius - 80);

type DonutChartProps = {
  inputData: any[];
  getValue: (item: any) => number;
};

function DonutChart({ inputData, getValue }: DonutChartProps) {
  return (
    <svg width={width} height={height}>
      <g transform={`translate(${width / 2}, ${height / 2})`}>
        {pie(inputData).map((item: any, i) => {
          return (
            <g key={`${i}`}>
              <path
                d={arc(item) || ``}
                fill={fillColor(`${i}`).toString() || ``}
              />
              <text
                transform={`translate(${arc.centroid(item)})`}
                style={{ fill: `white`, textAnchor: `middle` }}
              >
                {`${getValue(item.data)}`}
              </text>
            </g>
          );
        })}
      </g>
    </svg>
  );
}

export default DonutChart;
