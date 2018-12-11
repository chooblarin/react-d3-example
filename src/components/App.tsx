import React from "react";
import dayjs from "dayjs";

import BarChart from "./BarChart";
import DonutChart from "./DonutChart";
import TimeSeriesChart from "./TimeSeriesChart";
import MultiTimeSeriesChart from "./MultiTimeSeriesChart";
import DailyRankChart from "./DailyRankChart";
import ResponsiveDailyRankChart from "./ResponsiveDailyRankChart";
import WeekActivityBarChart from "./WeekActivityBarChart";
import HourActivityBarChart from "./HourActivityBarChart";
import withMeasureAndRender from "./withMeasureAndRender";
import {
  timeSeriesInputData,
  barInputData,
  donutInputData,
  dailyRankingData,
  multiTimeSeriesInputData,
  activitiesForWeek,
  activityesForDay
} from "../mock-data";

const MeasuredBarChart = withMeasureAndRender(BarChart);
const MeasuredTimeSeriesChart = withMeasureAndRender(TimeSeriesChart);
const MeasuredMultiTimeSeriesChart = withMeasureAndRender(MultiTimeSeriesChart);
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
        <HourActivityBarChart
          inputData={activityesForDay}
          width={640}
          height={200}
        />
        <WeekActivityBarChart
          inputData={activitiesForWeek}
          width={640}
          height={200}
        />
        <div style={{ width: "100%", height: "240px" }}>
          <MeasuredResponsiveDailyRankChart inputData={dailyRankingData} />
        </div>
        <div style={{ width: "100%", height: "240px" }}>
          <MeasuredDailyRankChart inputData={dailyRankingData} />
        </div>
        <div style={{ width: "100%", height: "240px" }}>
          <MeasuredTimeSeriesChart
            inputData={timeSeriesInputData}
            getX={item => dayjs(item.time).toDate()}
            getY={item => item.km}
            formatX={date => dayjs(date).format("MMM DD")}
          />
        </div>
        <div style={{ width: "100%", height: "240px" }}>
          <MeasuredMultiTimeSeriesChart
            mutiInputData={multiTimeSeriesInputData}
          />
        </div>
        <div style={{ width: "80%", height: "300px" }}>
          <MeasuredBarChart
            inputData={barInputData}
            getX={item => item.letter}
            getY={item => item.frequency}
          />
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
            max-width: 1000px;
            margin: 0 auto;
          }
        `}</style>
      </main>
    );
  }
}

export default App;
