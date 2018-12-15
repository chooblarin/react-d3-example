import React from "react";
import dayjs from "dayjs";

import withMeasureAndRender from "./withMeasureAndRender";
import TimeSeriesChart from "./TimeSeriesChart";
import MultiTimeSeriesChart from "./MultiTimeSeriesChart";

import { timeSeriesInputData, multiTimeSeriesInputData } from "../mock-data";

const MeasuredTimeSeriesChart = withMeasureAndRender(TimeSeriesChart);
const MeasuredMultiTimeSeriesChart = withMeasureAndRender(MultiTimeSeriesChart);

export default () => (
  <section>
    <h2>Line Chart</h2>
    <div style={{ width: "100%", height: "240px" }}>
      <MeasuredTimeSeriesChart
        inputData={timeSeriesInputData}
        getX={item => dayjs(item.time).toDate()}
        getY={item => item.km}
        formatX={date => dayjs(date).format("MMM DD")}
      />
    </div>
    <div style={{ width: "100%", height: "240px" }}>
      <MeasuredMultiTimeSeriesChart mutiInputData={multiTimeSeriesInputData} />
    </div>
    <style jsx>{`
      section {
        width: 100%;
      }
      h2 {
        margin: 1rem 20px;
      }
      .chart-container {
        width: 100%;
        height: 160px;
      }
    `}</style>
  </section>
);
