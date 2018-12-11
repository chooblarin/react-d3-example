import React from "react";
import { scaleTime, scaleLinear, ScaleTime } from "d3-scale";
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

const drawBackgroundRect = (x1: number, x2: number, height: number): string => {
  return `M${x1},0 L${x2},0 L${x2},${height} ${x1},${height}Z`;
};

const monthBackgroundRects = (
  start: dayjs.Dayjs,
  end: dayjs.Dayjs,
  scaleX: ScaleTime<number, number>,
  height: number
): string[] => {
  let bgRects = [];
  let cur = start;
  while (cur.isBefore(end)) {
    const endOfMonth = cur.endOf("month");
    const firstOfNextMonth = endOfMonth.add(1, "day");
    let x1: number;
    let x2: number;
    if (endOfMonth.isAfter(end)) {
      x1 = scaleX(cur.toDate());
      x2 = scaleX(end.toDate());
    } else {
      x1 = scaleX(cur.toDate());
      x2 = scaleX(firstOfNextMonth.toDate());
    }
    const r = drawBackgroundRect(x1, x2, height);
    bgRects.push(r);

    cur = firstOfNextMonth;
  }
  return bgRects;
};

const generateDayTickValues = (
  start: dayjs.Dayjs,
  end: dayjs.Dayjs
): dayjs.Dayjs[] => {
  const results: dayjs.Dayjs[] = [];
  let cur = end;
  while (start.isBefore(cur)) {
    results.push(dayjs(cur));
    cur = cur.add(-7, "day");
  }
  return results;
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

    const dayTickValues = generateDayTickValues(start, end).map(day =>
      day.toDate()
    );
    const axisX = axisBottom(x)
      .tickValues(dayTickValues)
      .tickFormat(date => dayjs(date as Date).format("MMM DD"));

    const axisY = axisLeft(y).ticks(5);

    // create month-background rect
    const bgRects = monthBackgroundRects(start, end, x, h);

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
