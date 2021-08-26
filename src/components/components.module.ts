import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { RequestOptionsComponent } from "./request-options/request-options.component";
import { MeasurementsChart } from "./measurements-chart/measurements-chart.component";
import { ChartjsModule } from "@ctrl/ngx-chartjs";
import { LoadingBarComponent } from "./loading-bar/loading-bar.component";

@NgModule({
  imports: [CommonModule, FormsModule, ChartjsModule],
  declarations: [RequestOptionsComponent, MeasurementsChart, LoadingBarComponent],
  exports: [RequestOptionsComponent, MeasurementsChart, LoadingBarComponent]
})
export class CommonComponentsModule {}
