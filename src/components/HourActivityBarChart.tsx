import React from "react";
import { scaleBand, scaleLinear, ScaleBand } from "d3-scale";
import { max, sum } from "d3-array";

import { InjectedProps } from "./withMeasureAndRender";

const getX = (item: any): number => item.hour;
const getY = (item: any): number => item.ratio;

const intervals = [
  { from: 0, to: 6, label: "Night" },
  { from: 6, to: 12, label: "Morning" },
  { from: 12, to: 18, label: "Daytime" },
  { from: 18, to: 24, label: "Evening" }
];

const getMostActiveInterval = (data: any[]): number => {
  const sorted = data.sort((a, b) => getX(a) - getX(b));
  const chunkSize = 6;
  const chunked = Array.from(
    { length: Math.ceil(sorted.length / chunkSize) },
    (_, i) => sorted.slice(i * chunkSize, i * chunkSize + chunkSize)
  );
  const sums = chunked.map(c => c.reduce((acc, v) => acc + getY(v), 0));
  return sums.findIndex(s => s === Math.max(...sums));
};

type HourActivityBarChartProps = {
  inputData: any[];
};

function HourActivityBarChart({
  inputData,
  width,
  height
}: HourActivityBarChartProps & InjectedProps) {
  const margin = { top: 20, right: 20, bottom: 60, left: 45 };
  const w = width - margin.left - margin.right;
  const h = height - margin.top - margin.bottom;

  const x = scaleBand()
    .range([0, w])
    .domain(inputData.map(d => `${getX(d)}`))
    .paddingInner(0.24);

  const y = scaleLinear()
    .range([h, 0])
    .domain([0, max<number, any>(inputData, getY)]);

  const markedIndex = getMostActiveInterval(inputData);

  const { from, to } = intervals[markedIndex];

  return (
    <svg width={width} height={height}>
      <g transform={`translate(${margin.left}, ${margin.top})`}>
        {inputData.map((item, i) => (
          <rect
            key={`${i}`}
            className={`bar ${from <= i && i < to ? "marked" : null}`}
            x={x(`${getX(item)}`)}
            y={y(getY(item))}
            width={x.bandwidth()}
            height={h - y(getY(item))}
          />
        ))}
        <HoursAxis scaleX={x} translateY={h} markedIndex={markedIndex} />
      </g>
      <style jsx>{`
        .bar {
          fill: #d8d8d8;
        }
        .bar.marked {
          fill: #51b2b8;
        }
      `}</style>
    </svg>
  );
}

type HoursAxisProps = {
  scaleX: ScaleBand<string>;
  translateY: number;
  markedIndex: number;
};

function HoursAxis({ scaleX, translateY, markedIndex }: HoursAxisProps) {
  const space = scaleX.step() - scaleX.bandwidth();
  const step = scaleX.step();
  const fontSize = 14;

  return (
    <g transform={`translate(0, ${translateY + 10})`}>
      {intervals
        .reduce((acc, v) => [...acc, v.to], [0])
        .map((h, i) => {
          const x =
            h === 0 ? -space / 2 : scaleX(`${h - 1}`)! + step - space / 2;
          return (
            <text x={x} y={fontSize} dy="4" fontSize={fontSize} key={`${i}`}>
              {`${h}`}
            </text>
          );
        })}
      {intervals.map(({ from, to, label }, i) => (
        <g
          className={`${markedIndex === i ? "marked" : null}`}
          key={`interval-${i}`}
        >
          <path
            d={`M${scaleX(`${from}`)},0L${scaleX(`${to - 1}`)! -
              space +
              step},0Z`}
          />
          <text x={scaleX(`${from + 3}`)} y={fontSize * 2} fontSize={16}>
            {label}
          </text>
        </g>
      ))}
      <style jsx>{`
        path {
          stroke: #d8d8d8;
          stroke-width: 2;
        }
        text {
          fill: #676767;
          text-anchor: middle;
        }
        .marked path {
          stroke: #51b2b8;
          stroke-width: 3;
        }
        .marked text {
          fill: #51b2b8;
          font-weight: 500;
        }
      `}</style>
    </g>
  );
}

export default HourActivityBarChart;
