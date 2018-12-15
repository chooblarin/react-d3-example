import React from "react";

import withMeasureAndRender from "./withMeasureAndRender";
import BarChart from "./BarChart";
import WeekActivityBarChart from "./WeekActivityBarChart";
import { barInputData, activitiesForWeek } from "../mock-data";

const MeasuredBarChart = withMeasureAndRender(BarChart);
const MeasuredWeekActivityBarChart = withMeasureAndRender(WeekActivityBarChart);

export default () => (
  <section>
    <h2>Bar Chart</h2>
    <div className="chart-container">
      <MeasuredBarChart
        inputData={barInputData}
        getX={item => item.letter}
        getY={item => item.frequency}
      />
    </div>
    <div className="chart-container">
      <MeasuredWeekActivityBarChart inputData={activitiesForWeek} />
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
