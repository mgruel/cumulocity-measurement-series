import { Component, EventEmitter, Input, Output } from "@angular/core";
import { Observable, of } from "rxjs";
import {
  AggregationType,
  RequestOptions
} from "../../models/measurement.model";

type RequestOptionsTemplate = {
  authToken: string | null;
  sourceId: string;
  dateFromDate: string;
  dateFromTime: string;
  dateToDate: string;
  dateToTime: string;
  aggregationType: AggregationType;
  aggregationTypes: AggregationType[];
  series: string | null;
};

@Component({
  selector: "app-request-options",
  templateUrl: "./request-options.component.html",
  styleUrls: ["./request-options.component.scss"]
})
export class RequestOptionsComponent {
  @Input() isLoading$: Observable<boolean> = of(false);
  @Output() setOptions = new EventEmitter<RequestOptions>();

  options: RequestOptionsTemplate = {
    authToken: localStorage._tcy8 || "",
    sourceId: "323273711",
    dateFromDate: "2023-05-01",
    dateFromTime: "08:00",
    dateToDate: "2023-05-31",
    dateToTime: "12:00",
    aggregationType: AggregationType.MINUTELY,
    aggregationTypes: Object.values(AggregationType),
    series: null
  };

  emitRequestOptions(): void {
    localStorage._tcy8 = this.options.authToken;
    this.setOptions.next({
      authToken: this.options.authToken,
      sourceId: this.options.sourceId,
      dateFrom: new Date(
        `${this.options.dateFromDate}T${this.options.dateFromTime}`
      ),
      dateTo: new Date(`${this.options.dateToDate}T${this.options.dateToTime}`),
      aggregationType: this.options.aggregationType,
      series: this.options.series
    });
  }
}
