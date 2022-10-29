import { HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ChartData } from "chart.js";
import { BehaviorSubject, combineLatest, Observable, of, timer } from "rxjs";
import { catchError, filter, map, switchMap } from "rxjs/operators";
import { RequestOptions } from "../models/measurement.model";
import { LoadingService } from "../services/loading/loading.service";
import { MeasurementService } from "../services/measurements/measurement.service";

@Injectable()
export class AppPloc {
  private readonly requestOptions = new BehaviorSubject<RequestOptions>(null);
  private readonly timer$ = timer(0, 15000);

  readonly chartData$: Observable<ChartData<"line">>;
  readonly isLoading$ = this.loadingService.isLoading$;

  constructor(
    private loadingService: LoadingService,
    private service: MeasurementService
  ) {
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
      filter(([_, options]) => !!options && options?.authToken.trim() !== ""),
      map(([_, options]) => options),
      switchMap(requestOptions =>
        this.service.getMeasurements(requestOptions).pipe(
          catchError((err: HttpErrorResponse | Error) => {
            console.error("Error while retrieving the datasets.", (err as HttpErrorResponse).error ?? err);
            return of([]);
          })
        )
      ),
      map(datasets => ({
        datasets
      }))
    );
  }
}
