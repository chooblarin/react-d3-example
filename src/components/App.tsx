import React from "react";
import ExampleBarChart from "./ExampleBarChart";
import ExampleLineChart from "./ExampleLineChart";
import DonutChart from "./DonutChart";
import DailyRankChart from "./DailyRankChart";
import ResponsiveDailyRankChart from "./ResponsiveDailyRankChart";
import withMeasureAndRender from "./withMeasureAndRender";
import { donutInputData, dailyRankingData } from "../mock-data";

const MeasuredDonutChart = withMeasureAndRender(DonutChart);
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
        <div style={{ width: "50vw", height: "50vw" }}>
          <MeasuredDonutChart
            inputData={donutInputData}
            getX={item => item.gender}
            getY={item => item.ratio}
          />
        </div>
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
