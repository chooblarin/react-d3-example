import React from "react";
import dayjs from "dayjs";

import BarChart from "./BarChart";
import DonutChart from "./DonutChart";
import TimeSeriesChart from "./TimeSeriesChart";
import withMeasureAndRender from "./withMeasureAndRender";

const donutInputData = [
  { gender: "male", ratio: 0.2 },
  { gender: "female", ratio: 0.8 }
];

const barInputData = [
  { letter: "h", frequency: 50 },
  { letter: "u", frequency: 30 },
  { letter: "l", frequency: 15 },
  { letter: "k", frequency: 5 }
];

const timeSeriesInputData = [
  { time: `2014-11-15`, km: 789 },
  { time: `2014-11-16`, km: 850 },
  { time: `2014-11-17`, km: 880 },
  { time: `2014-11-18`, km: 1086 },
  { time: `2014-11-19`, km: 1285 },
  { time: `2014-11-20`, km: 1398 }
];

class App extends React.Component<{}, {}> {
  render() {
    const MeasuredBarChart = withMeasureAndRender(BarChart);
    const MeasuredTimeSeriesChart = withMeasureAndRender(TimeSeriesChart);
    const MeasuredDonutChart = withMeasureAndRender(DonutChart);
    return (
      <div>
        <h1>Hello App</h1>
        <div className="container-time-series-chart">
          <MeasuredTimeSeriesChart
            inputData={timeSeriesInputData}
            getX={item => dayjs(item.time).toDate()}
            getY={item => item.km}
            formatX={date => dayjs(date).format("MMM DD")}
          />
        </div>
        <div className="container-bar-chart">
          <MeasuredBarChart
            inputData={barInputData}
            getX={item => item.letter}
            getY={item => item.frequency}
          />
        </div>
        <div className="container-donut-chart">
          <MeasuredDonutChart
            inputData={donutInputData}
            getX={item => item.gender}
            getY={item => item.ratio}
          />
        </div>

        <style jsx>{`
          .container-bar-chart {
            width: 100%;
            height: 400px;
            position: relative;
          }
          .container-time-series-chart {
            width: 80%;
            height: 300px;
            position: relative;
          }
          .container-donut-chart {
            width: 50vw;
            height: 50vw;
            position: relative;
          }
        `}</style>
        <style jsx global>{`
          html,
          body {
            margin: 0;
            padding: 0;
          }
          body {
            font-family: system-ui;
          }
        `}</style>
      </div>
    );
  }
}

export default App;
