import { Injectable } from "@angular/core";
import { MeasurementService } from "../services/measurements/measurement.service";
import { combineLatest, timer, Observable, BehaviorSubject } from "rxjs";
import { switchMap, map, tap, filter } from "rxjs/operators";
import { ChartData } from "chart.js";
import { RequestOptions } from "../models/measurement.model";

@Injectable()
export class AppPloc {
  private readonly requestOptions = new BehaviorSubject<RequestOptions>(null);
  private readonly timer$ = timer(0, 15000);

  readonly chartData$: Observable<ChartData<"line">>;

  constructor(private service: MeasurementService) {
    this.chartData$ = this.setupChartData(
      this.timer$,
      this.requestOptions.asObservable()
    );
  }

  public updateRequestOptions(options: RequestOptions) {
    this.requestOptions.next(options);
  }

  private setupChartData(
    timer$: Observable<number>,
    requestOptions$: Observable<RequestOptions>
  ): Observable<ChartData<"line">> {
    return combineLatest([timer$, requestOptions$]).pipe(
      filter(([_, options]) => !!options),
      map(([_, options]) => options),
      switchMap(requestOptions => this.service.getMeasurements(requestOptions)),
      map(datasets => ({
        datasets
      }))
    );
  }
}
