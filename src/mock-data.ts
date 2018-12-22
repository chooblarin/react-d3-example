import dayjs from "dayjs";

import { TimeSeriesItem } from "./models/timeseries-data";

export const donutInputData = [
  { gender: "male", ratio: 0.2 },
  { gender: "female", ratio: 0.8 }
];

export const barInputData = [
  { letter: "Superman", frequency: 50 },
  { letter: "Batman", frequency: 30 },
  { letter: "Flash", frequency: 15 },
  { letter: "Aquaman", frequency: 5 }
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

export const dailyMockData: TimeSeriesItem[] = Array(7 * 10) // 10 weeks
  .fill(null)
  .map((_, i) => {
    const day = lastDay.add(-i, "day");
    const value = Math.floor(10 * Math.random() + 20);
    return { day, value };
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

export const activitiesForWeek = [
  { date: 0, ratio: 0.3 }, // Sun
  { date: 1, ratio: 0.245 }, // Mon
  { date: 2, ratio: 0.25 }, // Tue
  { date: 3, ratio: 0.24 }, // Wed
  { date: 4, ratio: 0.22 }, // Thu
  { date: 5, ratio: 0.26 }, // Fri
  { date: 6, ratio: 0.29 } // Sat
];
