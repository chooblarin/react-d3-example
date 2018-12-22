import React from "react";

import withMeasureAndRender from "./withMeasureAndRender";
import BarChart from "./barcharts/BarChart";
import RoundedBarChart from "./barcharts/RoundedBarChart";
import GradientBarChart from "./barcharts/GradientBarChart";
import GradientBarChart2 from "./barcharts/GradientBarChart2";
import WeekActivityBarChart from "./barcharts/WeekActivityBarChart";
import { barInputData, activitiesForWeek } from "../mock-data";

const MeasuredBarChart = withMeasureAndRender(BarChart);
const MeasuredRoundedBarChart = withMeasureAndRender(RoundedBarChart);
const MeasuredGradientBarChart = withMeasureAndRender(GradientBarChart);
const MeasuredGradientBarChart2 = withMeasureAndRender(GradientBarChart2);
const MeasuredWeekActivityBarChart = withMeasureAndRender(WeekActivityBarChart);

export default () => (
  <section id="bar-chart-examples">
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
    <h3>Gradient Bar Chart</h3>
    <div className="chart-container">
      <MeasuredGradientBarChart
        inputData={barInputData}
        getX={item => item.letter}
        getY={item => item.frequency}
      />
    </div>
    <h3>Gradient Bar Chart 2</h3>
    <div className="chart-container">
      <MeasuredGradientBarChart2
        inputData={barInputData}
        getX={item => item.letter}
        getY={item => item.frequency}
      />
    </div>
    <h3>No Axis Bar Chart</h3>
    <div className="chart-container">
      <MeasuredWeekActivityBarChart inputData={activitiesForWeek} />
    </div>
    <style jsx>{`
      section {
        width: 90%;
      }
      .chart-container {
        width: 100%;
        height: 160px;
      }
    `}</style>
  </section>
);
