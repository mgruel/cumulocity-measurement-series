import { OperatorFunction, pipe } from "rxjs";
import { filter, map } from "rxjs/operators";
import {
  Dataset,
  Datasets,
  MeasurementSeries,
  MeasurementValues
} from "../../models/measurement.model";

export const convertToChartData = (): OperatorFunction<
  [MeasurementValues, MeasurementSeries],
  Datasets
> => {
  return pipe(
    filter(([values, series]) => !!values && !!series),
    filter(
      ([values, series]) => Object.keys(values).length > 0 && series.length > 0
    ),
    map(([values, series]) =>
      series.map((s, index): Dataset => {
        const color =
          "#" +
          (0x1000000 + Math.random() * 0xffffff).toString(16).substr(1, 6);
        return {
          label: `${s.type}.${s.name}`,
          data: Object.keys(values)
            .filter(time => !!values[time][index])
            .map(time => {
              const m = values[time][index];
              return {
                x: new Date(time).valueOf(),
                y: (m.min + m.max) / 2
              };
            }),
          backgroundColor: color,
          borderColor: color,
          borderWidth: 1
        };
      })
    )
  );
};
