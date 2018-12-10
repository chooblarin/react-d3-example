import React from "react";
import dayjs from "dayjs";

import BarChart from "./BarChart";
import DonutChart from "./DonutChart";
import TimeSeriesChart from "./TimeSeriesChart";
import withMeasureAndRender from "./withMeasureAndRender";
import {
  timeSeriesInputData,
  barInputData,
  donutInputData
} from "../mock-data";

const MeasuredBarChart = withMeasureAndRender(BarChart);
const MeasuredTimeSeriesChart = withMeasureAndRender(TimeSeriesChart);
const MeasuredDonutChart = withMeasureAndRender(DonutChart);

class App extends React.Component<{}, {}> {
  render() {
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
          }
          .container-time-series-chart {
            width: 80%;
            height: 300px;
          }
          .container-donut-chart {
            width: 50vw;
            height: 50vw;
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
