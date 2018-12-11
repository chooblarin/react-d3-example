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

export const activitiesForWeek = [
  { date: 0, ratio: 0.3 }, // Sun
  { date: 1, ratio: 0.245 }, // Mon
  { date: 2, ratio: 0.25 }, // Tue
  { date: 3, ratio: 0.24 }, // Wed
  { date: 4, ratio: 0.22 }, // Thu
  { date: 5, ratio: 0.26 }, // Fri
  { date: 6, ratio: 0.29 } // Sat
];

export const activityesForDay = [
  { hour: 0, ratio: 0.58 },
  { hour: 1, ratio: 0.54 },
  { hour: 2, ratio: 0.49 },
  { hour: 3, ratio: 0.38 },
  { hour: 4, ratio: 0.2 },
  { hour: 5, ratio: 0.16 },
  { hour: 6, ratio: 0.19 },
  { hour: 7, ratio: 0.2 },
  { hour: 8, ratio: 0.24 },
  { hour: 9, ratio: 0.25 },
  { hour: 10, ratio: 0.29 },
  { hour: 11, ratio: 0.3 },
  { hour: 12, ratio: 0.4 },
  { hour: 13, ratio: 0.5 },
  { hour: 14, ratio: 0.46 },
  { hour: 15, ratio: 0.44 },
  { hour: 16, ratio: 0.42 },
  { hour: 17, ratio: 0.36 },
  { hour: 18, ratio: 0.35 },
  { hour: 19, ratio: 0.55 },
  { hour: 20, ratio: 0.6 },
  { hour: 21, ratio: 0.64 },
  { hour: 22, ratio: 0.58 },
  { hour: 23, ratio: 0.54 }
];
