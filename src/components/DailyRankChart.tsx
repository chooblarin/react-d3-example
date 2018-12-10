import React from "react";
import { scaleTime, scaleLinear } from "d3-scale";
import { extent } from "d3-array";
import { line, curveMonotoneX } from "d3-shape";
import { select } from "d3-selection";
import { axisBottom, axisLeft } from "d3-axis";

import { InjectedProps } from "./withMeasureAndRender";
import { DailyRank } from "../models/ranking-data";

type DailyRankChartProps = {
  inputData: DailyRank[];
};

function DailyRankChart({
  inputData,
  width,
  height
}: DailyRankChartProps & InjectedProps) {
  const getX = (item: DailyRank) => item.day;
  const getY = (item: DailyRank) => item.rank;

  const margin = { top: 20, right: 20, bottom: 40, left: 45 };
  const w = width - margin.left - margin.right;
  const h = height - margin.top - margin.bottom;

  if (0 < inputData.length) {
    const data = inputData.sort((a, b) => a.day.getTime() - b.day.getTime());
    const start = data[0].day;
    const end = data[data.length - 1].day;

    const x = scaleTime()
      .range([0, w])
      .domain([start, end]);

    const y = scaleLinear()
      .range([h, 0])
      .domain(extent(data, getY) as number[])
      .nice();

    const valueLine = line()
      .x((d: any) => x(getX(d)))
      .y((d: any) => y(getY(d)))
      .curve(curveMonotoneX);

    const axisX = axisBottom(x).ticks(inputData.length / 7);
    const axisY = axisLeft(y).ticks(5);

    return (
      <svg width={width} height={height}>
        <g transform={`translate(${margin.left}, ${margin.top})`}>
          <path className="line" d={valueLine(data as any) || ``} />
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
  return <svg width={width} height={height} />;
}

export default DailyRankChart;
