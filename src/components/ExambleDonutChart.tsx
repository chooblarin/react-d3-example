import React from "react";

import withMeasureAndRender from "./withMeasureAndRender";
import DonutChart from "./DonutChart";
import { donutInputData } from "../mock-data";

const MeasuredDonutChart = withMeasureAndRender(DonutChart);

export default () => (
  <section>
    <h2>Dounut Chart</h2>
    <div className="chart-container">
      <MeasuredDonutChart
        inputData={donutInputData}
        getX={item => item.gender}
        getY={item => item.ratio}
      />
    </div>
    <style jsx>{`
      section {
        width: 90%;
      }
      .chart-container {
        width: 300px;
        height: 300px;
        margin: 0 auto;
      }
    `}</style>
  </section>
);
