import React from "react";
import dayjs from "dayjs";
import { scaleTime, scaleLinear, ScaleTime } from "d3-scale";
import { min, max } from "d3-array";
import { line, curveMonotoneX } from "d3-shape";
import { select } from "d3-selection";
import { axisBottom, axisLeft } from "d3-axis";
import { Delaunay } from "d3-delaunay";

import { InjectedProps } from "./withMeasureAndRender";
import { TimeSeriesItem } from "../models/timeseries-data";

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

type DailyLineChartProps = {
  inputData: TimeSeriesItem[];
};

type DailyLineChartState = {
  hoveredIndex: number | null;
};

class DailyLineChart extends React.Component<
  DailyLineChartProps & InjectedProps,
  DailyLineChartState
> {
  constructor(props: DailyLineChartProps & InjectedProps) {
    super(props);
    this.state = {
      hoveredIndex: null
    };
  }

  render() {
    const { inputData, width, height } = this.props;

    if (0 === inputData.length) {
      return <svg width={width} height={height} />;
    }

    const getX = (item: TimeSeriesItem) => item.day;
    const getY = (item: TimeSeriesItem) => item.value;

    const margin = { top: 20, right: 20, bottom: 40, left: 45 };
    const w = width - margin.left - margin.right;
    const h = height - margin.top - margin.bottom;

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
      .domain([Math.max(0, minY - upperMargin), maxY + lowerMargin])
      .nice();

    const valueLine = line()
      .x((d: any) => x(getX(d)))
      .y((d: any) => y(getY(d)))
      .curve(curveMonotoneX);

    // setup axis
    const numOfYAxis = 5;

    const dayTickValues = generateDayTickValues(start, end).map(day =>
      day.toDate()
    );

    const axisX = axisBottom(x)
      .tickValues(dayTickValues)
      .tickFormat(date => dayjs(date as Date).format("MMM DD"))
      .tickSizeInner(0)
      .tickPadding(8);

    const axisY = axisLeft(y).ticks(numOfYAxis);

    const horizontalLines = axisLeft(y)
      .ticks(numOfYAxis)
      .tickSize(-w)
      .tickFormat(() => "");

    // create month-background rect
    const bgRects = monthBackgroundRects(start, end, x, h);

    const points = data.map(({ day, value }) => {
      return [x(day), y(value)];
    });
    const delaunay = Delaunay.from(points);
    const voronoi = delaunay.voronoi([0, 0, w, h]);
    const cellPolygons = voronoi.cellPolygons();

    let tooltip;
    const { hoveredIndex } = this.state;
    if (hoveredIndex !== null) {
      const { day, value } = data[hoveredIndex];
      tooltip = (
        <g className="tooltop" transform={`translate(${x(day)}, ${y(value)})`}>
          <circle r={3.5} />
          <text y={-10} fontSize={12}>{`value: ${value}`}</text>
        </g>
      );
    } else {
      tooltip = null;
    }

    return (
      <svg width={width} height={height}>
        <g transform={`translate(${margin.left}, ${margin.top})`}>
          <g className="month-bg">
            {bgRects.map((d, i) => (
              <path key={`${i}`} d={d} />
            ))}
          </g>
          <g
            className="grid h-grid"
            ref={node => {
              const grid = select(node);
              grid
                .call(horizontalLines as any)
                .select(".domain")
                .remove();
              grid.selectAll(".tick line").attr("stroke", "#e1e1e1");
            }}
          />
          <g
            className="axis axis-x"
            transform={`translate(0, ${h})`}
            ref={node =>
              select(node)
                .call(axisX as any)
                .select(".domain")
                .remove()
            }
          />
          <g
            className="axis axis-y"
            ref={node => {
              const axis = select(node);
              axis
                .call(axisY as any)
                .select(".domain")
                .remove();
              axis.selectAll(".tick line").remove();
            }}
          />
          <path className="line" d={valueLine(data as any) || ``} />
          {tooltip}
          <g className="voronoi">
            {Array.from(cellPolygons).map((polygon, i) => {
              const pathData = `M${polygon
                .map(([x, y]) => `${x},${y}`)
                .join("L")}Z`;
              return (
                <path
                  d={pathData}
                  key={`${i}`}
                  onMouseOver={() => this.onCellMouseOver(i)}
                  onMouseOut={() => this.onCellMouseOut()}
                />
              );
            })}
          </g>
        </g>
        <style jsx>
          {`
            .line {
              fill: none;
              stroke: #1c9099;
              stroke-width: 2;
            }
            .axis {
              color: #676767;
            }
            .month-bg path:nth-child(even) {
              fill: #fcfdff;
              stroke: none;
            }
            .month-bg path:nth-child(odd) {
              fill: #f2f4f7;
              stroke: none;
            }
            .voronoi {
              fill: none;
              stroke: none;
            }
            .voronoi path {
              pointer-events: all;
            }
          `}
        </style>
      </svg>
    );
  }

  private onCellMouseOver(hoveredIndex: number) {
    this.setState({ hoveredIndex });
  }

  private onCellMouseOut() {
    this.setState({ hoveredIndex: null });
  }
}

export default DailyLineChart;
