import { ChartDataset } from "chart.js";

export enum AggregationType {
  MINUTELY = "MINUTELY",
  HOURLY = "HOURLY",
  DAILY = "DAILY"
}

export type RequestOptions = {
  authToken: string;
  sourceId: string;
  dateFrom: Date;
  dateTo: Date;
  aggregationType?: AggregationType;
  series?: string;
};

export type Measurement = {
  x: number | string;
  y: number;
};

export type Measurements = Array<Measurement>;

export type MeasurementValues = Record<
  string,
  Array<{ min: number; max: number }>
>;
export type MeasurementSeries = Array<{
  unit: string;
  name: string;
  type: string;
}>;
export type MeasurementSeriesResponse = {
  values: MeasurementValues;
  series: MeasurementSeries;
  truncated: boolean;
};

export type Dataset = ChartDataset<"line">;

export type Datasets = Array<Dataset>;
