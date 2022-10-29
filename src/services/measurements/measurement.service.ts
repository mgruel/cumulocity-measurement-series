import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, throwError } from "rxjs";
import { map } from "rxjs/operators";
import { convertToChartData } from "../../components/operators/measurements-to-chartset";
import {
  Datasets,
  MeasurementSeriesResponse,
  RequestOptions
} from "../../models/measurement.model";

export const getBaseUrl = () => "https://demos.cumulocity.com";
export const getMeasurementsBaseUrl = () =>
  `${getBaseUrl()}/measurement/measurements`;
export const getMeasurementSeriesUrl = () =>
  `${getMeasurementsBaseUrl()}/series`;

@Injectable()
export class MeasurementService {
  constructor(private http: HttpClient) {}

  getMeasurements(requestOptions: RequestOptions): Observable<Datasets> {
    if (!requestOptions) {
      return throwError(() => new Error("Missing Request-Options"));
    }
    if (!requestOptions.authToken) {
      return throwError(() => new Error("Missing Auth-Token"));
    }
    const params = {
      source: requestOptions.sourceId,
      dateFrom: requestOptions.dateFrom.toISOString(),
      dateTo: requestOptions.dateTo.toISOString(),
      aggregationType: requestOptions.aggregationType
    };
    if (requestOptions.series) {
      params["series"] = requestOptions?.series;
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
