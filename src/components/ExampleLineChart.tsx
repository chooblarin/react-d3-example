import React from "react";
import dayjs from "dayjs";

import withMeasureAndRender from "./withMeasureAndRender";
import TimeSeriesChart from "./linecharts/TimeSeriesChart";
import MultiTimeSeriesChart from "./linecharts/MultiTimeSeriesChart";
import DailyLineChart from "./linecharts/DailyLineChart";
import ResponsiveDailyLineChart from "./linecharts/ResponsiveDailyLineChart";
import { dailyMockData } from "../mock-data";

const MeasuredDailyLineChart = withMeasureAndRender(DailyLineChart);
const MeasuredResponsiveDailyLineChart = withMeasureAndRender(
  ResponsiveDailyLineChart
);

import { timeSeriesInputData, multiTimeSeriesInputData } from "../mock-data";

const MeasuredTimeSeriesChart = withMeasureAndRender(TimeSeriesChart);
const MeasuredMultiTimeSeriesChart = withMeasureAndRender(MultiTimeSeriesChart);

export default () => (
  <section>
    <h2>Line Chart</h2>
    <h3>Time Series (Normal)</h3>
    <div className="chart-container">
      <MeasuredTimeSeriesChart
        inputData={timeSeriesInputData}
        getX={item => dayjs(item.time).toDate()}
        getY={item => item.km}
        formatX={date => dayjs(date).format("MMM DD")}
      />
    </div>
    <h3>Time Series (Multiple)</h3>
    <div className="chart-container">
      <MeasuredMultiTimeSeriesChart mutiInputData={multiTimeSeriesInputData} />
    </div>
    <h3>Time Series w/background</h3>
    <div className="chart-container">
      <MeasuredDailyLineChart inputData={dailyMockData} />
    </div>
    <h3>Time Series w/background (Adjusted)</h3>
    <div className="chart-container">
      <MeasuredResponsiveDailyLineChart inputData={dailyMockData} />
    </div>

    <style jsx>{`
      section {
        width: 90%;
      }
      .chart-container {
        width: 100%;
        height: 240px;
      }
    `}</style>
  </section>
);
