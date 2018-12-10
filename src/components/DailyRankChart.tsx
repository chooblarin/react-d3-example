import React from "react";
import { scaleTime, scaleLinear } from "d3-scale";
import { min, max } from "d3-array";
import { line, curveMonotoneX } from "d3-shape";
import { select } from "d3-selection";
import { axisBottom, axisLeft } from "d3-axis";

import { InjectedProps } from "./withMeasureAndRender";
import { DailyRank } from "../models/ranking-data";
import dayjs from "dayjs";

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
    const data = inputData.sort((a, b) => (a.day.isBefore(b.day) ? -1 : 1));

    const start = data[0].day;
    const end = data[data.length - 1].day;

    const x = scaleTime()
      .range([0, w])
      .domain([start, end]);

    const minY = min(data, getY) || 0;
    const maxY = max(data, getY) || 0;
    const upperMargin = 3;
    const lowerMargin = 10;
    const y = scaleLinear()
      .range([h, 0])
      .domain([maxY + lowerMargin, Math.max(0, minY - upperMargin)])
      .nice();

    const valueLine = line()
      .x((d: any) => x(getX(d)))
      .y((d: any) => y(getY(d)))
      .curve(curveMonotoneX);

    const axisX = axisBottom(x).ticks(inputData.length / 7);
    const axisY = axisLeft(y).ticks(5);

    // create month-background rect

    const drawBackgroundRect = (from: dayjs.Dayjs, to: dayjs.Dayjs) => {
      const fd = from.toDate();
      const td = to.toDate();
      return `M${x(fd)},0 L${x(td)},0 L${x(td)},${h} ${x(fd)},${h}Z`;
    };

    let bgRects = [];
    let curDay = start;
    for (const d of data) {
      const { day } = d;
      if (curDay.month() !== day.month()) {
        const r = drawBackgroundRect(curDay, day);
        bgRects.push(r);
        curDay = day;
      }
    }
    const r = drawBackgroundRect(curDay, end);
    bgRects.push(r);

    return (
      <svg width={width} height={height}>
        <g transform={`translate(${margin.left}, ${margin.top})`}>
          {bgRects.map((d, i) => (
            <path key={`${i}`} className={i % 2 === 0 ? "even" : "odd"} d={d} />
          ))}
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
              stroke: #d9592c;
              stroke-width: 2;
            }
            .even {
              fill: #fcfdff;
              stroke: none;
            }
            .odd {
              fill: #f2f4f7;
              stroke: none;
            }
          `}
        </style>
      </svg>
    );
  }
  return <svg width={width} height={height} />;
}

export default DailyRankChart;
