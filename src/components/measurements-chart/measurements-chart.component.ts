import { Component, Input } from "@angular/core";
import {
  Chart,
  ChartData,
  ChartOptions,
  Legend,
  LinearScale,
  LineController,
  LineElement,
  PointElement,
  TimeScale,
  Title
} from "chart.js";
import 'chartjs-adapter-luxon';
import { Observable } from "rxjs";

Chart.register(LineController, LineElement, PointElement, LinearScale, TimeScale, Title, Legend);

@Component({
  selector: "app-measurements-chart",
  templateUrl: "./measurements-chart.component.html",
  styleUrls: ["./measurements-chart.component.scss"]
})
export class MeasurementsChart {
  @Input() chartData$: Observable<ChartData>;
  readonly chartOptions: ChartOptions<"line"> = {
    responsive: true,
    scales: {
      x: {
        type: "time"
      },
      y: {
        type: "linear"
      }
    }
  };
}
