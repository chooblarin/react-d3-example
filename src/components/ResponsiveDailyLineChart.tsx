import React from "react";

import { InjectedProps } from "./withMeasureAndRender";
import DailyLineChart from "./DailyLineChart";
import { TimeSeriesItem } from "../models/timeseries-data";

type ResponsiveDailyLineChartProps = {
  inputData: TimeSeriesItem[];
};

function ResponsiveDailyLineChart(
  props: ResponsiveDailyLineChartProps & InjectedProps
) {
  const { width, inputData } = props;
  const sorted = inputData.sort((a, b) => (b.day.isBefore(a.day) ? -1 : 1));

  let adjustedData: TimeSeriesItem[] = [];
  if (width <= 550) {
    adjustedData = sorted.slice(0, 4 * 7); // 4 weeks
  } else if (width <= 750) {
    adjustedData = sorted.slice(0, 8 * 7); // 8 weeks
  } else {
    adjustedData = sorted.slice(0, 10 * 7); // 10 weeks
  }

  const adjustedProps = { ...props, inputData: adjustedData };

  return <DailyLineChart {...adjustedProps} />;
}

export default ResponsiveDailyLineChart;
