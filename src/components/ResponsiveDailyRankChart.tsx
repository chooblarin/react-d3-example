import React from "react";

import { InjectedProps } from "./withMeasureAndRender";
import DailyRankChart from "./DailyRankChart";
import { DailyRank } from "../models/ranking-data";

type ResponsiveDailyRankChartProps = {
  inputData: DailyRank[];
};

function ResponsiveDailyRankChart(
  props: ResponsiveDailyRankChartProps & InjectedProps
) {
  const { width, inputData } = props;
  const sorted = inputData.sort((a, b) => b.day.getTime() - a.day.getTime());

  let adjustedData: DailyRank[] = [];
  if (width <= 550) {
    adjustedData = sorted.slice(0, 4 * 7); // 4 weeks
  } else if (width <= 750) {
    adjustedData = sorted.slice(0, 8 * 7); // 8 weeks
  } else {
    adjustedData = sorted.slice(0, 10 * 7); // 10 weeks
  }

  const adjustedProps = { ...props, inputData: adjustedData };

  return <DailyRankChart {...adjustedProps} />;
}

export default ResponsiveDailyRankChart;
