import dayjs from "dayjs";

export type TimeSeriesItem = {
  day: dayjs.Dayjs;
  value: number;
};
