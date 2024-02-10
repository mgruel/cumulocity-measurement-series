import { OperatorFunction, pipe } from "rxjs";
import { filter, map } from "rxjs/operators";
import {
  Dataset,
  Datasets,
  MeasurementSeries,
  MeasurementValues
} from "../../models/measurement.model";

export type ColorDef = { borderColor: string; backgroundColor: string };
export type ColorDefs = Array<ColorDef>;
export const convertToChartData = (
  colors?: ColorDefs | ColorDef
): OperatorFunction<[MeasurementValues, MeasurementSeries], Datasets> => {
  return pipe(
    filter(([values, series]) => !!values && !!series),
    filter(
      ([values, series]) => Object.keys(values).length > 0 && series.length > 0
    ),
    map(([values, series]) =>
      series.map((s, index): Dataset => {
        const providedColor = colors && colors[index] || colors;
        const fallbackColor = `#${(0x1000000 + Math.random() * 0xffffff)
          .toString(16)
          .substring(1, 7)}`;
        const colorDef: ColorDef = providedColor ? providedColor : { backgroundColor: fallbackColor, borderColor: fallbackColor };
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
          backgroundColor: colorDef.backgroundColor,
          borderColor: colorDef.borderColor,
          borderWidth: 1
        };
      })
    )
  );
};
