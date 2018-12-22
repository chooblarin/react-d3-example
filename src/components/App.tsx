import React from "react";
import ExampleBarChart from "./ExampleBarChart";
import ExampleLineChart from "./ExampleLineChart";
import ExampleDounutChart from "./ExambleDonutChart";

import DailyLineChart from "./linecharts/DailyLineChart";
import ResponsiveDailyLineChart from "./linecharts/ResponsiveDailyLineChart";
import withMeasureAndRender from "./withMeasureAndRender";
import { dailyMockData } from "../mock-data";

const MeasuredDailyLineChart = withMeasureAndRender(DailyLineChart);
const MeasuredResponsiveDailyLineChart = withMeasureAndRender(
  ResponsiveDailyLineChart
);

class App extends React.Component<{}, {}> {
  render() {
    return (
      <main>
        <h1>React + D3 Examples</h1>
        <ExampleBarChart />
        <ExampleLineChart />
        <div style={{ width: "100%", height: "240px" }}>
          <MeasuredResponsiveDailyLineChart inputData={dailyMockData} />
        </div>
        <div style={{ width: "100%", height: "240px" }}>
          <MeasuredDailyLineChart inputData={dailyMockData} />
        </div>
        <ExampleDounutChart />
        <style jsx global>{`
          html,
          body {
            margin: 0;
            padding: 0;
          }
          body {
            font-family: system-ui;
          }
          main {
            display: flex;
            flex-direction: column;
            align-items: center;
            max-width: 960px;
            margin: 0 auto;
          }
        `}</style>
      </main>
    );
  }
}

export default App;
