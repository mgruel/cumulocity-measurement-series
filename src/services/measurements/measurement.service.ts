import { Injectable } from "@angular/core";
import { Observable, OperatorFunction, pipe } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { map } from "rxjs/operators";
import {
  RequestOptions,
  MeasurementSeriesResponse,
  Datasets
} from "../../models/measurement.model";
import { convertToChartData } from "../../components/operators/measurements-to-chartset";

export const getBaseUrl = () => "https://demos.cumulocity.com";
export const getMeasurementsBaseUrl = () =>
  `${getBaseUrl()}/measurement/measurements`;
export const getMeasurementSeriesUrl = () =>
  `${getMeasurementsBaseUrl()}/series`;

@Injectable()
export class MeasurementService {
  constructor(private http: HttpClient) {}

  getMeasurements(requestOptions: RequestOptions): Observable<Datasets> {
    const params = {
      source: requestOptions.sourceId,
      dateFrom: requestOptions.dateFrom.toISOString(),
      dateTo: requestOptions.dateTo.toISOString(),
      aggregationType: requestOptions.aggregationType
    };
    if (requestOptions.series) {
      params["series"] = requestOptions.series;
    }
    return this.http
      .get<MeasurementSeriesResponse>(getMeasurementSeriesUrl(), {
        headers: {
          Accept: "application/json",
          Authorization: `Basic ${requestOptions.authToken}`
        },
        params
      })
      .pipe(
        map(res => [res.values, res.series]),
        convertToChartData()
      );
  }
}
