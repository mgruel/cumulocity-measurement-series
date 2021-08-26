import { Component, Output, EventEmitter } from "@angular/core";
import {
  AggregationType,
  RequestOptions
} from "../../models/measurement.model";

@Component({
  selector: "app-request-options",
  templateUrl: "./request-options.component.html",
  styleUrls: ["./request-options.component.scss"]
})
export class RequestOptionsComponent {
  @Output() setOptions: EventEmitter<RequestOptions> = new EventEmitter();

  options = {
    authToken: localStorage._tcy8 || null,
    sourceId: "323273711",
    dateFromDate: "2020-05-29",
    dateFromTime: "08:00",
    dateToDate: "2020-05-29",
    dateToTime: "10:01",
    aggregationType: AggregationType.MINUTELY,
    aggregationTypes: Object.values(AggregationType),
    series: null
  };

  emitRequestOptions(): void {
    localStorage._tcy8 = this.options.authToken;
    this.setOptions.next({
      authToken: this.options.authToken as string,
      sourceId: this.options.sourceId,
      dateFrom: new Date(
        `${this.options.dateFromDate}T${this.options.dateFromTime}`
      ),
      dateTo: new Date(`${this.options.dateToDate}T${this.options.dateToTime}`),
      aggregationType: this.options.aggregationType as AggregationType,
      series: this.options.series
    });
  }
}
