import React from "react";
import ExampleBarChart from "./ExampleBarChart";
import ExampleLineChart from "./ExampleLineChart";
import ExampleDounutChart from "./ExambleDonutChart";

import DailyRankChart from "./DailyRankChart";
import ResponsiveDailyRankChart from "./ResponsiveDailyRankChart";
import withMeasureAndRender from "./withMeasureAndRender";
import { dailyRankingData } from "../mock-data";

const MeasuredDailyRankChart = withMeasureAndRender(DailyRankChart);
const MeasuredResponsiveDailyRankChart = withMeasureAndRender(
  ResponsiveDailyRankChart
);

class App extends React.Component<{}, {}> {
  render() {
    return (
      <main>
        <h1>React + D3 Examples</h1>
        <ExampleBarChart />
        <ExampleLineChart />
        <div style={{ width: "100%", height: "240px" }}>
          <MeasuredResponsiveDailyRankChart inputData={dailyRankingData} />
        </div>
        <div style={{ width: "100%", height: "240px" }}>
          <MeasuredDailyRankChart inputData={dailyRankingData} />
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
