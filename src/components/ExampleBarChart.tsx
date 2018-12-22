import React from "react";

import withMeasureAndRender from "./withMeasureAndRender";
import BarChart from "./BarChart";
import RoundedBarChart from "./RoundedBarChart";
import WeekActivityBarChart from "./WeekActivityBarChart";
import { barInputData, activitiesForWeek } from "../mock-data";

const MeasuredBarChart = withMeasureAndRender(BarChart);
const MeasuredRoundedBarChart = withMeasureAndRender(RoundedBarChart);
const MeasuredWeekActivityBarChart = withMeasureAndRender(WeekActivityBarChart);

export default () => (
  <section>
    <h2>Bar Chart</h2>
    <h3>Normal</h3>
    <div className="chart-container">
      <MeasuredBarChart
        inputData={barInputData}
        getX={item => item.letter}
        getY={item => item.frequency}
      />
    </div>
    <h3>Rounded Bar Chart</h3>
    <div className="chart-container">
      <MeasuredRoundedBarChart
        inputData={barInputData}
        getX={item => item.letter}
        getY={item => item.frequency}
        radius={12}
        color={"#5ca462"}
      />
    </div>
    <h3>No Axis Bar Chart</h3>
    <div className="chart-container">
      <MeasuredWeekActivityBarChart inputData={activitiesForWeek} />
    </div>
    <style jsx>{`
      section {
        width: 100%;
      }
      .chart-container {
        width: 100%;
        height: 160px;
      }
    `}</style>
  </section>
);
