import dayjs from "dayjs";

import { DailyRank } from "./models/ranking-data";

export const donutInputData = [
  { gender: "male", ratio: 0.2 },
  { gender: "female", ratio: 0.8 }
];

export const barInputData = [
  { letter: "h", frequency: 50 },
  { letter: "u", frequency: 30 },
  { letter: "l", frequency: 15 },
  { letter: "k", frequency: 5 }
];

export const timeSeriesInputData = [
  { time: `2014-11-15`, km: 789 },
  { time: `2014-11-16`, km: 850 },
  { time: `2014-11-17`, km: 880 },
  { time: `2014-11-18`, km: 1086 },
  { time: `2014-11-19`, km: 1285 },
  { time: `2014-11-20`, km: 1398 }
];

const lastDay = dayjs(`2018-12-10`);

export const dailyRankingData: DailyRank[] = Array(7 * 10) // 10 weeks
  .fill(null)
  .map((_, i) => {
    const day = lastDay.add(-i, "day");
    const rank = Math.floor(10 * Math.random() + 20);
    return { day, rank };
  });

export const multiTimeSeriesInputData: any[][] = (function() {
  const numOfSeries = 3;
  const start = dayjs(`2018-10-10`);
  const end = dayjs(`2018-12-10`);

  const results: any[][] = [];
  for (let i = 0; i < numOfSeries; i += 1) {
    const series: any[] = [];
    let cur = start;
    while (cur.isBefore(end)) {
      const time = dayjs(cur);
      const value = Math.floor(5 * (2 * Math.random() - 1) + 5 * i + 30);
      series.push({ time, value });
      cur = cur.add(1, "day");
    }
    results.push(series);
  }
  return results;
})();
