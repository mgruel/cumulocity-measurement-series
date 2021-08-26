import { Component, Input } from "@angular/core";
import { ChartOptions, ChartData } from "chart.js";
import { Observable } from "rxjs";

@Component({
  selector: "app-measurements-chart",
  templateUrl: "./measurements-chart.component.html",
  styleUrls: ["./measurements-chart.component.scss"]
})
export class MeasurementsChart {
  @Input() chartData$: Observable<ChartData>;
  readonly chartOptions: ChartOptions = {
    responsive: true,
    scales: {
      xAxes: [
        {
          type: "time"
        }
      ],
      yAxes: [
        {
          type: "linear"
        }
      ]
    },
    plugins: {
      zoom: {
        pan: {
          enabled: true,
          mode: "xy"
        },
        zoom: {
          enabled: true,
          drag: true,
          mode: "xy"
        }
      }
    }
  };
}
